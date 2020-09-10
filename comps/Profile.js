import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity,StatusBar,ScrollView,AsyncStorage,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux'
import {changeNavPage,clearHistory,changePage,exportProduct,updateBarcode,updateTime,changeNavPageToTab} from '../redux/action'
import StarRating from 'react-native-star-rating';
import firebase from 'firebase';
import moment from 'moment';  // for occured time
var date = moment().format("MMM Do YYYY"); //occured time

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class Profile extends Component {

  state={
    email:"",
    useremail:"",
    userfirstname:"",
    userlastname:"",
    tab1:'white',
    //tab2:"#ffffff59",
    tab3:this.props.homebutt,
    history:[],
    reviews:[],
    refresh:false,
    avatar:''
  }

  //Clear History

    async removeAll(){
      try {
        await AsyncStorage.removeItem("items");
        await this.setState({
          history:[]
        })
        await this.props.dispatch(clearHistory(true))
        return true;
      }
      catch(exception) {
        return false;
      }
    }
    

    handleClear=()=> {
    
      Alert.alert(
				'Are you sure?',
				'All history will be erased',
				[
          {text: 'OK', onPress: () => {this.removeAll()}},
          {text: 'Cancel'},
				],
				{ cancelable: false }
        ) 
  }

  //ChangePage when click on History items
  handleForward = async (obj) => {
    var response = await fetch("https://previews-bcit.herokuapp.com/barcode/" + obj.upc)
    var json = await response.json()
    this.props.dispatch(exportProduct(json))
    this.props.dispatch(updateBarcode(obj.upc))
    this.props.dispatch(updateTime(date))
    this.props.dispatch(changePage("Product"))

  }


  handleReviewProduct= async (obj) => {
    var response = await fetch("https://previews-bcit.herokuapp.com/barcode/" + obj.upc)
    var json = await response.json()
    this.props.dispatch(exportProduct(json))
    this.props.dispatch(updateBarcode(obj.upc))
    this.props.dispatch(updateTime(date))
    this.props.dispatch(changePage("Product"))
  }


  handleDelete=(obj) => {
    console.log(obj)
    Alert.alert(
      'Are you sure?',
      'Your review will be erased in Previews database',
      [ 
        {text: 'OK', onPress: () => {
          var firebase = require('firebase');
          currentUser = firebase.auth().currentUser;
          firebase.database().ref('products/'+obj.upc+"/newProductReview/"+currentUser.uid).remove();
          firebase.database().ref('users/'+currentUser.uid+"/Reviews/"+obj.upc).remove();
          this.readEmail();
        }},
        {text: 'Cancel'},
      ],
      { cancelable: false }
      ) 
   
  }

  handleAddImg=()=>{
    this.props.dispatch(changePage("Avatar"))
   }

  handleBack=()=>{
    this.props.dispatch(changeNavPage("HomePage"))
  }

  logout=()=>{
    AsyncStorage.setItem('access',"notGranted"); //remove token
    firebase.auth().signOut().then(()=>{
      this.removeAll() //clear history
      this.props.dispatch(changeNavPage("LogIn"))
    }).catch(error => {
        console.log(error.message)
    })
  }

  readEmail=()=>{
    var firebase = require('firebase');
    currentUser = firebase.auth().currentUser;
      if (currentUser) {
        firebase.database().ref('users/'+currentUser.uid).once('value').then(snapshot =>{
          var user = snapshot.val(); 
        
          this.setState({
            useremail:user.email,
            userfirstname: user.firstname,
            userlastname: user.lastname,
            reviews: user.Reviews,
            avatar: user.userAvatar
          })
       
        }).catch(error => {
          this.setState({error: error.message})
        }); 
      }
  }



  componentWillMount = async ()=>{
    this.readEmail();
    try{
        let myItems = await AsyncStorage.getItem("items");
        let myArr = JSON.parse(myItems);
			
	
			
            //Remove duplicates
            var obj = {};
            for ( var i=0; i < myArr.length; i++ )
                {obj[myArr[i]['name']] = myArr[i];
    }
                myArr = new Array();
                
      
            for ( var key in obj){
              myArr.push(obj[key]);
         
              // console.log(myArr[myArr.length-1].name) 
              if(myArr[myArr.length-1].name ==undefined){
                myArr.splice(myArr.length-1);
              }
              
            }
          
   
       
            

      this.setState({
        history: myArr
      })
  
    } catch(error){
      console.log(error)
    }
  }

  
  tab1=()=>{
    this.setState({
      tab1:'white',
      //tab2:"#ffffff59",
      tab3:this.props.homebutt,
    })

  }

  // tab2=()=>{
  //   this.setState({
  //     tab1:"#ffffff59",
  //     tab2:"white",
  //     tab3:"#ffffff59",
  //   })
  // }
  tab3=()=>{
    this.setState({
      tab1:this.props.homebutt,
     // tab2:"#ffffff59",
      tab3:'white'
    })

  }
 

  render() {

    var content;

    //HISTORY
    if(this.state.tab1 ==='white'){

      if(this.state.history){

      
      var historyArr  = this.state.history.map((obj, index)=>{
        return(
        <TouchableOpacity  
          style={styles.greyBox} key={index}
          onPress={this.handleForward.bind(this,obj)}
          activeOpacity={1}
          >            
          <Image
              style={{width:90, height:90, borderRadius:7, marginLeft:10,marginRight:10}}
              source={{uri: obj.thumb}}
          />
          <View style={{width:250}}>
           <Text style={{fontWeight:"bold",fontSize:14, textAlign:"left"}}>{obj.name}</Text>
           <Text><Text style={{fontWeight:"bold",textAlign:"left"}}>Price: </Text>${obj.price}</Text>
           <Text><Text style={{fontWeight:"bold",textAlign:"left"}}>UPC: </Text>{obj.upc}</Text>         
           </View>
        </TouchableOpacity >
      )})
      content =
        <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <ScrollView style={{width:"100%",height:"86%",marginBottom:50}}>
          {historyArr}
            </ScrollView>
  
                  <TouchableOpacity
                  onPress={this.handleClear}
                  style={{width:160, height:32, backgroundColor: this.props.bottomcol, borderRadius:8,position:"absolute",bottom: 9, paddingTop: 6,zIndex:99}}>
                  <Text style={{fontSize: 16, color:"#FFFFFF", textAlign: "center"}}>CLEAR HISTORY</Text>
                  </TouchableOpacity>

         </View>
        }

        else{
          content =
          <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <ScrollView style={{width:"100%",height:"90%",marginBottom:50}}>
       
              </ScrollView>
    
                    <TouchableOpacity
                    onPress={this.handleClear}
                    style={{width:160, height:32, backgroundColor: this.props.bottomcol, borderRadius:8,position:"absolute",bottom: 9, paddingTop: 6,zIndex:99}}>
                    <Text style={{fontSize: 16, color:"#FFFFFF", textAlign: "center"}}>CLEAR HISTORY</Text>
                    </TouchableOpacity>
  
           </View>
        }
    }
    


    //BOOKMARKED
    // else if(this.state.tab2 ==="white"){   
    //   content =
    //   <ScrollView style={{width:"100%", height:"100%"}}>   
    //   </ScrollView>
    // }


    //REVIEWS
    else if(this.state.tab3 ==='white'){
      if(this.state.reviews){

        var reviewsArr=[];
        for(var index in this.state.reviews){
          var obj=this.state.reviews[index]
        
          var comp = (
            <View style={[styles.reviewBox, {backgroundColor:this.props.radiocol}]} key={index}>
              <View style={{alignItems:'flex-start',justifyContent:"center",width:"100%", backgroundColor:this.props.bottomcol,height:40, marginBottom: 20, borderTopRightRadius:20, borderTopLeftRadius:20, paddingLeft:20}}>

                         <StarRating
                          disabled={true}
                          emptyStar="ios-star-outline"
                          fullStar="ios-star"
                          halfStar="ios-star-half"
                          iconSet="Ionicons"
                          maxStars={5}
                          starSize={15}
                          rating={obj.rating}
                          fullStarColor="white"
                          halfStarColor="white"
                          emptyStarColor="white"
                          halfStarEnabled
                          starPadding={10}
                        />
                        <TouchableOpacity style={{position: "absolute", right:15}}><Icon size={40} color="white" name="chevron-right" onPress={this.handleReviewProduct.bind(this,obj)}/></TouchableOpacity>
                        <TouchableOpacity style={{position: "absolute", right:65}}><Icon size={25} color="white" name="delete" onPress={this.handleDelete.bind(this,obj)}/></TouchableOpacity>
              </View>
              <View style={{margin: 20, marginTop:0}}>
              <Text style={{color:this.props.stext}}><Text style={{fontWeight:"bold", fontSize:20, color:this.props.stext}}>{obj.title}{'\n'}</Text></Text>
              <Text style={{color:this.props.stext}}><Text style={{fontWeight:"bold"}}>UPC: </Text>{obj.upc}</Text>
              <Text style={{textAlign:"justify", color:this.props.stext}}><Text style={{fontWeight:"bold"}}>Review: </Text>{obj.review}{'\n'}{'\n'}</Text>
              </View>
          </View>
          )
          reviewsArr.push(comp);
        }

        content =
          <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <ScrollView style={{width:"100%", height:"100%"}}>
            {reviewsArr}
              </ScrollView>  
           </View>
          }
  
          else{
            content =
            <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
              <ScrollView style={{width:"100%", height:"100%"}}>
         
                </ScrollView>
             </View>
          }
    }

    
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:"100%"}}>
                     <MyStatusBar backgroundColor={this.props.bottomcol} barStyle="light-content" />
                      <View style={{ flex: 0.3, backgroundColor:this.props.bottomcol,width:"100%", }}></View>
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.bottomcol,width:"100%", }}>
                      <TouchableOpacity style={{position: "absolute", left:15}}><Icon size={50} color="white" name="chevron-left" onPress={this.handleBack}/></TouchableOpacity>
                        <Text style={{ color:this.props.ptext, fontSize:24, }}>PROFILE</Text>
                      </View>
                      <View style={{flex: 8, alignItems: 'center', justifyContent: 'flex-start',width:"100%", marginBottom:56}}>
                      <View style={[styles.infoContainer, {backgroundColor:this.props.radiocol}]}>

                       <View style={{xalignItems:"center",flexDirection:"row", justifyContent:"flex-end"}}>
                            <TouchableOpacity 
                                style={styles.AddProductImg}
                                onPress={this.handleAddImg}
                            >
                                <Image
                                    style={{ width:90, height:90, justifyContent:"flex-start", borderRadius: 45,zIndex:10}}
                                    source={{uri: this.state.avatar}}
                                />
                                <Icon style={styles.icons}  size={45} color={this.props.bottomcol} name="image-plus" />	
                            </TouchableOpacity>
                             </View>
                          <View style={{width:"60%",height:"100%", alignItems:"center", justifyContent:"center"}}>
                          <Text style={[styles.UNstyles, {color:this.props.ttext}]}>{this.state.userfirstname}  {this.state.userlastname} </Text>
                         
                          <Text style={{color:this.props.stext}} >{this.state.useremail}</Text>

                          <TouchableOpacity  onPress={this.logout}>
                          <Text style={{color:this.props.ttext, textDecorationLine:"underline", fontSize:18, marginTop: 8}}>Sign Out</Text>
                          </TouchableOpacity>
                           </View>              
                      </View>
                      <View style={{flex:1,}}>
                              <View style={{ flex:1, flexDirection:"row",alignItems:"flex-end",justifyContent:"space-evenly", backgroundColor:this.props.bottomcol, width:"100%" }}>
                                  <TouchableOpacity 
                                        style={[styles.TabStyles,{backgroundColor:this.state.tab1}]}
                                        onPress={this.tab1}
                                        >
                                      <Text  
                                        style={styles.TabTextstyles}>HISTORY</Text>
                                    </TouchableOpacity>

                                  {/* <TouchableOpacity 
                                        style={[styles.TabStyles,{backgroundColor:this.state.tab2}]}
                                        onPress={this.tab2}
                                        >
                                      <Text  
                                        style={styles.TabTextstyles}>SAVED</Text>
                                    </TouchableOpacity> */}

                                      <TouchableOpacity 
                                        style={[styles.TabStyles,{backgroundColor:this.state.tab3}]}
                                        onPress={this.tab3}
                                        >

                                      <Text 
                                        style={styles.TabTextstyles}>REVIEWS</Text>
                                    </TouchableOpacity>
                              </View>                                 
                              </View>
                            <View style={{flex:7, justifyContent:"center",width:"100%"}}>                      
                            {content}                  
                            </View>  
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
  },  
    infoContainer:{
    width:"100%",
    height:100,
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center"
  },
  UNstyles:{
    fontSize:20,
    fontWeight:"bold"
    
  },
  TabStyles:{
    width:180,
    height:40,
    padding:10,
    marginTop:10,
    marginLeft:5,
    alignContent:"center",
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  },
  TabTextstyles:{
    textAlign:"center"
  },
  greyBox:{
    height:100,
    margin: 5, 
    paddingLeft:20,
    flexDirection:"row",
    alignItems:"center",
    backgroundColor: "#efefef",
    marginTop: 10,
    borderRadius:10
  },  
 reviewBox:{
   width:"90%",
    marginTop: 40,
    borderRadius:20,
    alignSelf:"center"
  

   

  },
  myStarStyle: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  myEmptyStarStyle: {
    color: "rgba(255,255,255,0.4)",
  },
  AddProductImg:{
    width:90,
    height:90,
    backgroundColor:'white',
    justifyContent:"center",
    borderRadius: 45,
  },
icons:{
  position:"absolute",
  top:23,
  left:21
}
});

function mapStateToProps(state){
  return{
		bgcol:state.CheckBarcode.bgcol,
    ptext:state.CheckBarcode.ptext,
		bottomcol:state.CheckBarcode.bottomcol,
		stext:state.CheckBarcode.stext,
		radiocol:state.CheckBarcode.radiocol,
		homebutt:state.CheckBarcode.homebutt,
		ttext:state.CheckBarcode.ttext
   }
}
export default connect(mapStateToProps)(Profile)