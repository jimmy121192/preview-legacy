import React, { Component } from 'react'
import { View, StyleSheet, Keyboard, Image, Text,TextInput, TouchableOpacity,StatusBar,Alert,TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux'
import firebase from './config/firebaseconfig'
import {changePage,newProdImg,changeNavPage,updateproduct,newProduct} from '../redux/action'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import RNFetchBlob from 'rn-fetch-blob';
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const options = [
    'Cancel', 
    <View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color: '#614B8E', fontSize:18}}>Use Camera  </Text><Icon size={30}  color="#614B8E" name="photo-camera"/></View>,
    <View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color: '#614B8E', fontSize:18}}>Open Gallery  </Text><Icon  size={30} color="#614B8E" name="image"/></View>
    
  ]
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class AddProduct extends Component {

state={
    nproductName:"",
    nproductManu:"",
    nproductPrice:"",
    nproductUpc:this.props.upc,
    nproductDesc:"",
    photos:'',
}

componentDidMount = async() =>{
      await this.setState({
        nproductName: this.props.savedName,
        nproductManu:this.props.savedManu,
        nproductPrice:this.props.savedPrice,
        nproductDesc:this.props.savedDesc,
      })
  }

showActionSheet = () => {
    this.ActionSheet.show()
  }
handleAddImg=()=>{
    this.props.dispatch(newProduct(this.state.nproductName,this.state.nproductManu,this.state.nproductPrice,this.state.nproductDesc))
    this.props.dispatch(changePage("MyCameraRoll"))
   }
handleCamera=()=>{
    this.props.dispatch(changePage("Camera"))
   }


handleAddProduct= async()=>{
      await this.saveNewProd();
        
       
       if(this.state.nproductName ===''){
        Alert.alert(
            'Product Name Required',
            'Please add Product Name',
            [
            {text: 'OK'},
            ],
            { cancelable: false }
        )
            }
        else if(this.state.nproductManu ===''){
            Alert.alert(
                'Product Manufacturer Required',
                'Please add Product Manufacturer',
                [
                {text: 'OK'},
                ],
                { cancelable: false }
        )
            }
        else if(this.state.nproductPrice ===''){
            Alert.alert(
                'Product Price Required',
                'Please add Product Price (USD)',
                [
                {text: 'OK'},
                ],
                { cancelable: false }
        )
            }
        
        else if(this.state.nproductDesc ===''){
            Alert.alert(
                'Product Description Required',
                'Please add Product Description',
                [
                {text: 'OK'},
                ],
                { cancelable: false }
        )
            }
        else {  
            
            this.props.dispatch(newProdImg(''));
            this.props.dispatch(newProduct('','','',''))
            this.props.dispatch(updateproduct(this.state.nproductName));
            Alert.alert(
                'Product Added Successfully',
                'Thanks for your contribution :)',
                [
                {text: 'Leave a review', onPress: () => {this.handleAddReview()}},
                {text: 'OK', onPress: () => {this.handleBack()}},
                ],
                { cancelable: false }
      )
    }

 }
handleAddReview=()=>{
    this.props.dispatch(changePage("AddReview"))
}


handleBack=()=>{
    this.props.dispatch(newProdImg(''))
    this.props.dispatch(newProduct('','','',''))
    this.props.dispatch(changeNavPage("HomePage"))
  }


//saving all datas for the add product

	saveNewProd= async()=> {
        var firebase = require('firebase');
        if (firebase.auth().currentUser) {
          currentUser = firebase.auth().currentUser;
          if (currentUser) {
            firebase.database().ref('products/'+ this.state.nproductUpc).set({
                newProductName: this.state.nproductName,
                newProductManu: this.state.nproductManu,
                newProductPrice: this.state.nproductPrice,
                newProdUpc: this.state.nproductUpc,
                newProductDesc:this.state.nproductDesc,
            })
            
            //upload image
            if(this.props.newProdImg ===''){
                Alert.alert(
                  'Product Image Required',
                  'Please add an image',
                  [
                    {text: 'OK'},
                  ],
                  { cancelable: false }
                )
                 }
            
                
            var imgF = await RNFetchBlob.fs.readFile(this.props.newProdImg, "base64");
              var blob = await Blob.build(imgF, {type: 'image/jpg;BASE64'});
              this.blob = blob;
              
              var imgRef = firebase.storage().ref('products/'+this.props.upc+"/productImage/"); 
              imgRef.put(this.blob, {contentType:'image/jpg'}).then((snapshot)=>{
              firebase.storage().ref(snapshot.metadata.fullPath).getDownloadURL().then((url)=>{
                  //update firebase database with download url   
                firebase.database().ref('products/'+this.props.upc).update({
                  newProductImg: url
              });
                 })
              });  
        }
        }
    }

  render() {
        return (

            <TouchableWithoutFeedback style= { { flex:1}} onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:"100%", backgroundColor:this.props.bgcol }} behavior="padding" enabled>
                
                <MyStatusBar backgroundColor={this.props.bottomcol} barStyle="light-content" />
                      <View style={{ flex: 0.3, backgroundColor:this.props.bottomcol,width:"100%", }}>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.bottomcol,width:"100%", }}>
                      <TouchableOpacity style={{position: "absolute", left:15}}><Icon size={50} color='white' name="chevron-left" onPress={this.handleBack}/></TouchableOpacity>
                        <Text style={{ color:this.props.ptext, fontSize:24, }}>ADD PRODUCT</Text>

                      </View>
                <View style={{ width:"100%",flex: 8, alignItems: 'center',justifyContent: 'center', backgroundColor:this.props.bgcol }}>
                    <View style={{flex:2,flexDirection:"row",width:"90%"}}>
                        <View style={{flex:1, alignItems:"center",flexDirection:"row", justifyContent:"flex-start"}}>
                            <TouchableOpacity 
                                style={styles.AddProductImg}
                                onPress={this.showActionSheet}
                            >
                                <Image
                                    style={{ width:120, height:120, justifyContent:"flex-start", borderRadius: 6,zIndex:10}}
                                    source={{uri: this.props.newProdImg}}
                                />
                                <Icon style={styles.icons}  size={70} color={this.props.bottomcol} name="add-a-photo" />	
                            </TouchableOpacity>
                             </View>   
                            <View style={styles.info1}>
                                
                                <TextInput
                                        value={this.state.nproductName}
                                        style={[styles.productTextInfo,{marginBottom:7.5}]}
                                        placeholder="Product Name"
                                        keyboardType={"default"}
                                        onChangeText={(text) => this.setState({nproductName: text})}
                                />
                                <TextInput
                                        value={this.state.nproductManu}
                                        style={styles.productTextInfo}
                                        placeholder="Manufacturer"
                                        keyboardType={"default"}
                                        onChangeText={(text) => this.setState({nproductManu: text})}
                                />
                                <TextInput
                                        value={this.state.nproductPrice}
                                        style={[styles.productTextInfo,{marginTop:7.5}]}
                                        placeholder="Price (USD)"
                                        keyboardType={"numeric"}
                                        onChangeText={(text) => this.setState({nproductPrice: text})}
                                />
                                </View>
                         </View>


                <View style={styles.info2}>

                    <TextInput
                            style={{  
                            width:"90%",   
                            backgroundColor:"#efefef",
                            padding:12,
                            fontSize:15,
                            borderRadius:6}}
                            value={this.props.upc}
                            placeholder="Enter UPC Number"
                            keyboardType={"number-pad"}
                            maxLength={13}
                            onChangeText={(text) => this.setState({nproductUpc: text})}
                    />
                    <TextInput
                            style={{
                                width:"90%",  
                                height:250,
                                backgroundColor:"#efefef",
                                padding:12,
                                fontSize:15,
                                borderRadius:6,
                                marginTop:9,
                             }}
                            value={this.state.nproductDesc}
                            placeholder="Description"
                            multiline={true}
                            numberOfLines={10}
                            keyboardType={"default"}
                            onChangeText={(text) => this.setState({nproductDesc: text})}
                    />
                </View>
                <ActionSheet
                    style={{flex:1}}
                    ref={o => this.ActionSheet = o}
                    title={<Text style={{color: '#000', fontSize: 14}}>How do you want to add image?</Text>}
                    options={options}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={2}
                    onPress={(index) => { 
                        if (index === 1) {this.handleCamera()};
                        if (index === 2) {this.handleAddImg()}

                    }}
                 />
                </View>
                    <TouchableOpacity
                        onPress={this.handleAddProduct}
                        style={{width:160, height:32, backgroundColor: this.props.bottomcol, borderRadius:8,position:"absolute",bottom: 65, paddingTop: 6,zIndex:99}}>
                        <Text style={{fontSize: 16, color:"#FFFFFF", textAlign: "center"}}>SUBMIT</Text>
                    </TouchableOpacity>
                </View> 
                </TouchableWithoutFeedback>     
    )
  }
}
const styles = StyleSheet.create({
  container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff8f7',
        justifyContent: 'center',
        alignItems: 'center'
  },
    LogOutBut:{
        width:135,
        height:40,
        backgroundColor:'#927eb0',
        padding:10,
        marginTop:20,
        margin:5,
        borderRadius:6,
        flexDirection:"column",
    },
    info1:{
        width:"60%",
        justifyContent:"center",
        alignItems:"center",
        flex:1.5,
    },
    info2:{  
        width:"100%",   
        flex:4,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:106 
    },
        productTextInfo:{
        width:"100%",
        height: 35,
        backgroundColor:"#efefef",
        paddingLeft:12,
        fontSize:16,
        borderRadius:6
    },
	AddProductImg:{
        width:120,
        height:120,
        backgroundColor:"#efefef",
		justifyContent:"center",
        borderRadius: 6,
    },
    icons:{
       position:"absolute",
       top:23,
       left:23
	}
});

function mapStateToProps(state){
  return{
    newProdImg: state.CheckBarcode.newProdImg,
    upc: state.CheckBarcode.upc,
    bgcol:state.CheckBarcode.bgcol,
    ptext:state.CheckBarcode.ptext,
    bottomcol:state.CheckBarcode.bottomcol,
    
    savedName:state.CheckBarcode.savedName,
    savedManu:state.CheckBarcode.savedManu,
    savedPrice:state.CheckBarcode.savedPrice,
    savedDesc:state.CheckBarcode.savedDesc,
		
  }
}
export default connect(mapStateToProps)(AddProduct)