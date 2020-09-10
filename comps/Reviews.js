import React, { Component } from 'react'
import { View, StyleSheet,Text, TouchableOpacity,StatusBar,ScrollView,Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux'
import {changePage} from '../redux/action'

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class Reviews extends Component {
  constructor() {
    super();
this.state={
  aveRating:'',
  reviewsArr:[],
  PreviewsArr:null

}
  }

  componentWillMount(){
    var firebase = require('firebase');
    firebase.database().ref('products/'+this.props.upc).once('value').then(snapshot =>{
      var product= snapshot.val(); 
     
      if(product === null){
        return
      }
      else{
        const ReviewsArray = Object.keys(product.newProductReview).map(i => product.newProductReview[i])
          this.setState({
              PreviewsArr: ReviewsArray,
            })
          }
      })
     
 } 

  componentDidMount(){
    return fetch("https://previews-bcit.herokuapp.com/reviews/" + this.props.productId)
      .then((response) => response.json()).catch((error) =>{
        return
      })
      .then((reviews) => {
        let myArr = []
        for (var i =0; i<reviews.reviews.length; i++){
          myArr.push({name: reviews.reviews[i].reviewer,title: reviews.reviews[i].title,rating: reviews.reviews[i].overallRating.rating, review: reviews.reviews[i].reviewText} )
    }
    this.setState({
      reviewsArr:  myArr,
      aveRating: JSON.parse(reviews.reviewStatistics.averageOverallRating)
    })
      })
      
  }

  handleBack=()=>{
    this.props.dispatch(changePage("Product"))
  }
  handleReview=()=>{
    this.props.dispatch(changePage("AddReview"))
  }


  render() {
  
    getItem=(item,index)=> {
        var myitems = [item.name, item.title, item.rating, item.review];
        // console.log(myitems)
        return (


        <View style={styles.greyBox} key={index}>
            <View style={{alignItems:'flex-start',justifyContent:"center", backgroundColor:"#cccccc",height:40, marginBottom: 20, borderTopRightRadius:20, borderTopLeftRadius:20, paddingLeft:20}}>
 
                      <StarRating
                          disabled={true}
                          emptyStar="ios-star-outline"
                          fullStar="ios-star"
                          halfStar="ios-star-half"
                          iconSet="Ionicons"
                          maxStars={5}
                          starSize={15}
                          rating={parseInt(myitems[2])}
                          fullStarColor="white"
                          halfStarColor="white"
                          emptyStarColor="white"
                          halfStarEnabled
                          starPadding={10}
                        />
            </View>
            <View style={{margin: 20, marginTop:0}}>
             <Text><Text style={{fontWeight:"bold", fontSize:20}}>{myitems[1]}{'\n'}</Text></Text>
             <Text><Text style={{fontWeight:"bold"}}>Name: </Text>{myitems[0]}</Text>
             <Text><Text style={{fontWeight:"bold"}}>Rating: </Text>{myitems[2]}</Text>
             <Text style={{textAlign:"justify"}}><Text style={{fontWeight:"bold"}}>Review: </Text>{myitems[3]}{'\n'}{'\n'}{'\n'}{'\n'} </Text>
             </View>
        </View>


        ) ;
    }
 var WalmartReviews;
 var Previews;
    //Render Empty Reviews
    // console.log(this.state.aveRating);

    if(this.state.PreviewsArr){
      Previews = this.state.PreviewsArr.map((obj, index)=>{
        return (
          <View style={[styles.reviewsBox, {backgroundColor:this.props.radiocol}]} key={index}>
          <View style={{alignItems:'flex-start',justifyContent:"center", backgroundColor:this.props.bottomcol,height:40, marginBottom: 20, borderTopRightRadius:20, borderTopLeftRadius:20, paddingLeft:20}}>
         
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
                    <TouchableOpacity style={{position: "absolute", right:35}}><Image source={require('../assets/whitelogo2.png')} style={{width: 30, height: 30}}/></TouchableOpacity>
          </View>
          <View style={{margin: 20, marginTop:0}}>
           <Text style={{color:this.props.stext}}><Text style={{fontWeight:"bold", fontSize:20}}>{obj.title}{'\n'}</Text></Text>
           <Text style={{color:this.props.stext}}><Text style={{fontWeight:"bold"}}>Name: </Text>{obj.name}</Text>
           <Text style={{color:this.props.stext}}><Text style={{fontWeight:"bold"}}>Rating: </Text>{obj.rating}</Text>
           <Text style={{textAlign:"justify", color:this.props.stext}}><Text style={{fontWeight:"bold"}}>Review: </Text>{obj.review}{'\n'}{'\n'} </Text>
           </View>
      </View>
        )
    })

    }


    if(this.state.aveRating === null && !this.state.PreviewsArr){
      
      WalmartReviews =     
        <Text style={{fontSize:20, color:this.props.stext, textAlign: "justify"}}>😢 Sorry! This product doesn't have any reviews yet.</Text>

    }
   
    else {
      WalmartReviews = this.state.reviewsArr.map(getItem);
      
  }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:"100%", backgroundColor:this.props.radiocol }}>
        <MyStatusBar backgroundColor={this.props.bottomcol} barStyle="light-content" />
        <View style={{ flex: 0.3, backgroundColor:this.props.bottomcol,width:"100%", }}>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.bottomcol,width:"100%", flexDirection:"row"}}>
          <TouchableOpacity style={{position: "absolute", left:15}}><Icon size={50} color="white" name="chevron-left" onPress={this.handleBack}/></TouchableOpacity>
            <Text style={{ color:this.props.ptext, fontSize:24, }}>PRODUCT REVIEWS</Text>
          </View>
          <View style={{ flex: 8, alignItems: 'center', justifyContent: 'flex-start',width:"100%"}}>
          <View style={{ width:'100%', height:80,flexDirection:'row', alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.radiocol}}>
          <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight:"bold",color:this.props.stext}}>{this.props.productname}</Text>
          <Text style={{color:this.props.stext}}><Text style={{fontWeight:"bold", color:this.props.ttext}}>Average Overall Rating: </Text> {this.state.aveRating}</Text>
          
          </View>
            </View> 
           <ScrollView style={{flex:1, padding: 20,width:"100%", marginBottom: 120}}>
           {Previews}
           {WalmartReviews}

            </ScrollView>
            <TouchableOpacity
        onPress={this.handleReview}
        disabled={this.state.disable}
        style={{opacity:this.state.opacity,width:160, height:32, backgroundColor: this.props.bottomcol, borderRadius:8,position:"absolute", bottom: 70, paddingTop: 6}}>
          <Text style={{fontSize: 15, color:"#FFFFFF", textAlign: "center"}}>LEAVE A REVIEW</Text>
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
  },
  reviewsBox:{
    marginTop: 40,
    borderRadius:20
  },
  greyBox:{
    backgroundColor: "#efefef",
    marginTop: 40,
    borderRadius:20
  },
});

function mapStateToProps(state){
  return{
    upc: state.CheckBarcode.upc,
    time: state.CheckBarcode.time,
    productname: state.CheckBarcode.productname,
    productId: state.CheckBarcode.productId,
    reviews: state.CheckBarcode.reviews,
		bgcol:state.CheckBarcode.bgcol,
    ptext:state.CheckBarcode.ptext,
		bottomcol:state.CheckBarcode.bottomcol,
		stext:state.CheckBarcode.stext,
		radiocol:state.CheckBarcode.radiocol,
		homebutt:state.CheckBarcode.homebutt,
		ttext:state.CheckBarcode.ttext
 
  }
}
export default connect(mapStateToProps)(Reviews)