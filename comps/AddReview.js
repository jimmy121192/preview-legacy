import React, { Component } from 'react'
import { View, StyleSheet, Keyboard, Image, Text,TextInput, TouchableOpacity,Button,StatusBar,TouchableWithoutFeedback,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux'
import firebase from './config/firebaseconfig'
import StarRating from 'react-native-star-rating';
import {changePage,newProdImg,changeNavPage} from '../redux/action'

const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);

class AddReview extends Component {

    reviewObj={}
    state={
        nproductUpc:this.props.upc,
        userfirstname:'',
        userlastname:'',
        newProdReview:[],
        reviewTitle:null,
        reviewText:null,
        reviewRating:null,
    }

handleAddReview=()=>{  
      if(this.state.reviewRating ===null){
        Alert.alert(
          'Star Rating Not Found',
          'Please enter your rating',
          [
            {text: 'OK'},
          ],
          { cancelable: false }
        )
      } 
      else if(this.state.reviewTitle ===null){
        Alert.alert(
          'Review Title Not Found',
          'Please enter review title',
          [
            {text: 'OK'},
          ],
          { cancelable: false }
        )
      } 
      else if(this.state.reviewText ===null){
        Alert.alert(
          'Review Not Found',
          'Please enter your review',
          [
            {text: 'OK'},
          ],
          { cancelable: false }
        )
      } 
      
      else {
        this.reviewObj = {"upc":this.state.nproductUpc,"name":this.state.userfirstname,"title":this.state.reviewTitle,"review":this.state.reviewText,"rating":this.state.reviewRating};
        this.saveNewReview(); 
        this.props.dispatch(newProdImg("aa")) 
        Alert.alert(
          'Review Added Successfully',
          'Thanks for your contribution :)',
          [
            {text: 'OK', onPress: () => {this.handleBack()}},
          ],
          { cancelable: false }
        )
      }

    
}

handleBack=()=>{
  this.props.dispatch(changeNavPage("HomePage"))
}


componentWillMount = async ()=>{
  this.loadUserName();
}

loadUserName=()=>{
  var firebase = require('firebase');
  currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase.database().ref('users/'+currentUser.uid).once('value').then(snapshot =>{
        var user = snapshot.val(); 
        // console.log(user)
        this.setState({
          userfirstname: user.firstname,
          userlastname: user.lastname
        })
      }).catch(error => {
        alert(error)
      }); 
    }
}

//update review for the product

saveNewReview=()=> {
      var firebase = require('firebase');
      if (firebase.auth().currentUser) {
        currentUser = firebase.auth().currentUser;
        if (currentUser) {
          firebase.database().ref('products/'+ this.props.upc+'/newProductReview/'+currentUser.uid).set(this.reviewObj)
          firebase.database().ref('users/'+currentUser.uid+"/Reviews/"+this.props.upc).set(this.reviewObj);
        }
      }
  }

render() {

      return (

        <TouchableWithoutFeedback style= { { flex:1}} onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:"100%", backgroundColor:this.props.bgcol}} behavior="padding" enabled>
              <MyStatusBar backgroundColor={this.props.bottomcol} barStyle="light-content" />
                <View style={{ flex: 0.3, backgroundColor:"#614B8E",width:"100%", backgroundColor:this.props.bottomcol }}></View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.bottomcol,width:"100%", }}>
                  <TouchableOpacity style={{position: "absolute", left:15}}><Icon size={50} color="white" name="chevron-left" onPress={this.handleBack}/></TouchableOpacity>
                    <Text style={{ color:this.props.ptext, fontSize:24, }}>ADD REVIEW</Text>
                    </View>
  
              <View style={{ width:"100%",flex: 8, alignItems: 'center',justifyContent: 'center', marginBottom:106}}>
                  <View style={{flex:1,flexDirection:"column",width:"90%"}}>
                  <Text style={{fontSize:24,color:this.props.ttext,fontWeight:"bold",marginTop:40 }}>{this.state.userfirstname} {this.state.userlastname}</Text>     
                  <Text style={{fontSize:20,fontWeight:"bold", color:this.props.stext }}>{this.props.productname}</Text>
                  <Text style={{fontSize:18, color:this.props.stext}}>UPC: {this.props.upc}</Text>    
                  <TextInput
                          style={styles.productTextInfo}
                     
                          placeholder="Review title"
                          keyboardType={"default"}
                          onChangeText={(text) => this.setState({reviewTitle: text,disabled:false,opacity:1})}
                  />
                  <TextInput
             
                      style={{
                          width:"100%",  
                          flex:1,
                          backgroundColor:"#efefef",
                          padding:12,
                          fontSize:15,
                          borderRadius:6,
                          marginTop:9,
                      }}
                      placeholder="Leave your review..."
                      multiline={true}
                      numberOfLines={10}
                      keyboardType={"default"}
                      onChangeText={(text) => this.setState({reviewText: text})}
                  />  
                <View style={{alignItems:'center',flexDirection:"row",justifyContent:"flex-start",borderRadius:6, backgroundColor:"#efefef",height:50,marginTop:9,paddingLeft:20 }}>
                      <Text style={{fontSize:20}}>Rating: </Text>

                      <StarRating
                        disabled={false}
                        emptyStar="ios-star-outline"
                        fullStar="ios-star"
                        halfStar="ios-star-half"
                        iconSet="Ionicons"
                        maxStars={5}
                        starSize={25}
                        rating={this.state.reviewRating}
                        selectedStar={(val)=>{this.setState({reviewRating: val})}}
                        fullStarColor={this.props.bottomcol}
                        halfStarColor={this.props.bottomcol}
                        emptyStarColor={this.props.bottomcol}
                        halfStarEnabled
                        starPadding={10}
                      />

                  </View>    
                </View>
              </View>
                  <TouchableOpacity
                      onPress={this.handleAddReview}
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

  },
      productTextInfo:{
      marginTop:50,
      width:"100%",
      height: 35,
      backgroundColor:"#efefef",
      paddingLeft:12,
      fontSize:15,
      borderRadius:6
  },
AddProductImg:{
      width:120,
      height:120,
      backgroundColor:"#efefef",
    justifyContent:"center",
      borderRadius: 6,
  },

});

function mapStateToProps(state){
return{
  newProdImg: state.CheckBarcode.newProdImg,
  upc: state.CheckBarcode.upc,
  productname: state.CheckBarcode.productname,
  bgcol:state.CheckBarcode.bgcol,
  ptext:state.CheckBarcode.ptext,
  bottomcol:state.CheckBarcode.bottomcol,
  stext:state.CheckBarcode.stext,
  ttext:state.CheckBarcode.ttext
}
}
export default connect(mapStateToProps)(AddReview)