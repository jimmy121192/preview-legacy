import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity,StatusBar,ScrollView,AsyncStorage } from 'react-native'
import Barcode from 'react-native-barcode-builder';
import {connect} from 'react-redux'
import {changePage,updateproduct,clearHistory} from '../redux/action'

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
var myArr=[]
class Product extends Component {
  constructor() {
    super();
this.state={
  thumbs :'aaa',
  productname:'',
  productprice:'',
  brandname: '',
  desciption: '',
  productId:'',
  mode:false,
  opacity: 0,
  disable: true,
  bookmark: false,
  // icon:"bookmark",
  historyArr:[],
  PreviewsArr:[],
  available: false
}
  }


  // handleBookmark=()=>{
  //   if(this.state.bookmark===false){
  //   this.setState({
  //     bookmark: !this.state.bookmark,
  //     icon: "bookmark-check"
  //   })}
  //   else if(this.state.bookmark===true){
  //     this.setState({
  //       bookmark: !this.state.bookmark,
  //       icon: "bookmark"
  //     })}
  

  // }


  handleBack=()=>{
    this.props.dispatch(changePage(0))
  }
  handleAddProduct=()=>{
    this.props.dispatch(changePage("AddProduct"))
  }
  

  handleReview=()=>{
    if(this.state.available ===true){
      this.props.dispatch(updateproduct(this.state.PreviewsArr.newProductName,this.state.productId))
    }
    else{
      this.props.dispatch(updateproduct(this.props.productArr.items[0].name,parseInt(this.props.productArr.items[0].itemId))) 
    }
     this.props.dispatch(changePage("Reviews"))
  }
  _handleOpenWithWebBrowser = () => {
    this.props.dispatch(changePage("Google"))
  }
  _handleOpenWithWebBrowser2 = () => {
    this.props.dispatch(changePage("Amazon"))
  }

  
  componentWillMount(){
   this.checkReviewsArr();
    if(this.props.clear===true){
      myArr =[]
      this.props.dispatch(clearHistory(false))
    }
   
    
} 

  componentDidMount=async()=>{
    
      // console.log(this.props.productArr)

      try {
        myArr = await AsyncStorage.getItem("items");
      
      if (myArr === null){
        myArr=[]
      } else {
        myArr = JSON.parse(myArr);
      }
      // console.log(myArr);
      myArr.push({"name":this.props.productArr.items[0].name,"upc":this.props.upc,"thumb":this.props.productArr.items[0].largeImage,"price":this.props.productArr.items[0].salePrice})
      AsyncStorage.setItem('items',JSON.stringify(myArr));
    }catch(err){
      console.log(err)
    }

        if(this.props.productArr.errors){
          return
        }
        else {

          //setState the redux product
          this.setState({
            thumbs: this.props.productArr.items[0].largeImage,
            productname: this.props.productArr.items[0].name,
            productprice: "$"+this.props.productArr.items[0].salePrice,
            brandname:this.props.productArr.items[0].brandName,
            desciption: this.props.productArr.items[0].shortDescription,
            productId: parseInt(this.props.productArr.items[0].itemId),
            mode: !this.state.mode,
            disable: false,
            opacity: 1,
          });

          }
        
      }

        checkReviewsArr=()=>{
          var firebase = require('firebase');
              firebase.database().ref('products/'+this.props.upc).once('value').then(snapshot =>{
                var product= snapshot.val(); 
               
                if(product === null){
                  return
                }
                else{
                    this.setState({
                        available: true,
                        PreviewsArr: product,
                        disable: false,
                        opacity: 1,
                      })
                      myArr.push({"name":this.state.PreviewsArr.newProductName,"upc":this.props.upc,"thumb":this.state.PreviewsArr.newProductImg,"price":this.state.PreviewsArr.newProductPrice})
                      AsyncStorage.setItem('items',JSON.stringify(myArr));
               
                    }

                })
          }



  render() {
      var element = '';
            if(this.state.mode===false){
            if(this.state.available ===true){
                element = 

                <ScrollView style={{flex:1,padding: 20, marginBottom: 120}}>
                <Image 
                  source={{uri: this.state.PreviewsArr.newProductImg}} 
                  style={{height: 200, width: 300,resizeMode:"contain", borderRadius: 10, alignSelf: "center", margin:15}}
                />
            
                <Text style={{margin:5}}><Text style={{fontWeight:"bold", color:this.props.bottomcol}}>Name:</Text> {this.state.PreviewsArr.newProductName}</Text>
                <Text style={{margin:5}}><Text style={{fontWeight:"bold", color:this.props.bottomcol}}>Price:</Text> {this.state.PreviewsArr.newProductPrice}</Text>
                <Text style={{margin:5}}><Text style={{fontWeight:"bold", color:this.props.bottomcol}}>Manufacturer:</Text> {this.state.PreviewsArr.newProductManu}</Text>  
                <Text style={{textAlign:"justify", margin:5}}><Text style={{fontWeight:"bold", color:this.props.bottomcol}}>Description:</Text> {this.state.PreviewsArr.newProductDesc}</Text> 
             
                </ScrollView> 

              }
              else{
              element = 
        
             <View style={{flex:1, flexDirection:"column", padding:20, width:"100%", justifyContent:"center", alignItems:"center"}}>
              <Text style={{fontSize:20, color:this.props.bottomcol, textAlign: "center"}}>😢 Oops!!!  {"\n"}This product doesn't seem to be in our database. Please help us by adding it</Text> 
              <TouchableOpacity
                  onPress={this.handleAddProduct}
                  style={{width:160, height:32, backgroundColor: this.props.bottomcol, borderRadius:8,marginTop:40, 
              }}>
              <Text style={{fontSize: 15, color:"#FFFFFF", textAlign: "center",paddingTop: 6}}>ADD PRODUCT</Text>
              </TouchableOpacity>
              <Text style={{fontSize:20, color:this.props.bottomcol, textAlign: "center",marginTop:60}}>Or search this UPC on ...</Text>
              <View style={{flexDirection:"row",width:"100%", justifyContent:"space-evenly"}}>
              <TouchableOpacity 
                style={{marginTop:20}}
                onPress={this._handleOpenWithWebBrowser}
              >
              <Image 
                style={{width:60, height:60}}
                source={require('../assets/google.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={{marginTop:20}}
                onPress={this._handleOpenWithWebBrowser2}>
              <Image 
                style={{width:60, height:60}}
                source={require('../assets/amazon.png')}
              />
              </TouchableOpacity>
              </View>
            </View>
               }  
           }  
      else{     
        element = 
        <ScrollView style={{flex:1,padding: 20, marginBottom: 120}}>
        <Image 
          source={{uri: this.state.thumbs}} 
          style={{height: 200, width: 300,resizeMode:"contain", borderRadius: 10, alignSelf: "center", margin:15}}
        />
    
        <Text style={{margin:5}}><Text style={{fontWeight:"bold"}}>Name:</Text> {this.state.productname}</Text>
        <Text style={{margin:5}}><Text style={{fontWeight:"bold"}}>Price:</Text> {this.state.productprice}</Text>
        <Text style={{margin:5}}><Text style={{fontWeight:"bold"}}>Manufacturer:</Text> {this.state.brandname}</Text>  
        <Text style={{textAlign:"justify", margin:5}}><Text style={{fontWeight:"bold"}}>Description:</Text> {this.state.desciption}</Text> 
        </ScrollView> 
        }

    
      
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:"100%"}}>
        <MyStatusBar backgroundColor={this.props.bottomcol} barStyle="light-content" />
        <View style={{ flex: 0.3, backgroundColor:this.props.bottomcol,width:"100%", }}>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.bottomcol,width:"100%", flexDirection:"row"}}>
          {/* <TouchableOpacity style={{position: "absolute", left:15}}>
          <Icon size={50} color="white" name="chevron-left" onPress={this.handleBack}/>
          </TouchableOpacity> */}
            <Text style={{ color:this.props.ptext, fontSize:24, }}>PRODUCT DETAILS</Text>
          </View>
          <View style={{ flex: 8, alignItems: 'center', justifyContent: 'flex-start',width:"100%"}}>
          <View style={{ width:'100%', height:80,flexDirection:'row', alignItems: 'center', justifyContent: "space-evenly", backgroundColor:this.props.radiocol}}>
          <Barcode width={1} height={60} background='rgba(0,0,0,0)' value={this.props.upc} color={this.props.stext} format="CODE128" />
          <View style={{alignItems: 'center'}}>
          <Text style={{color:this.props.stext}}>{this.props.time}</Text>
          <Text style={{color:this.props.stext}}>{this.props.upc}</Text>
          </View>
          {/* <TouchableOpacity><Icon size={30} color="#614B8E" name={this.state.icon} onPress={this.handleBookmark}/></TouchableOpacity> */}
            </View> 
            {element}
            <TouchableOpacity
        onPress={this.handleReview}
        disabled={this.state.disable}
        style={{opacity:this.state.opacity,width:160, height:32, backgroundColor: this.props.bottomcol, borderRadius:8,position:"absolute", bottom: 70, paddingTop: 6}}>
          <Text style={{fontSize: 15, color:"#FFFFFF", textAlign: "center"}}>PRODUCT REVIEWS</Text>
      </TouchableOpacity>
          </View>
        </View>
    
    
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
  }
});

function mapStateToProps(state){
  return{
    upc: state.CheckBarcode.upc,
    time: state.CheckBarcode.time,
    productArr: state.CheckBarcode.productArr,
    clear: state.CheckBarcode.clear,
		bgcol:state.CheckBarcode.bgcol,
    ptext:state.CheckBarcode.ptext,
		bottomcol:state.CheckBarcode.bottomcol,
		stext:state.CheckBarcode.stext,
		radiocol:state.CheckBarcode.radiocol
		
  }
}
export default connect(mapStateToProps)(Product)