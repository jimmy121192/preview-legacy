import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity,Alert,StatusBar,ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux'
import moment from 'moment';  // for occured time
import {changePage, updateBarcode,exportProduct,updateTime} from '../redux/action'
var date = moment().format("MMM Do YYYY"); //occured time
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class Search extends Component {
  constructor() {
    super();
this.state={
 
  productsArr:[],
}
  }

  componentDidMount(){
    return fetch("https://previews-bcit.herokuapp.com/search/" + this.props.keyword)
      .then((response) => response.json())
      .then((products) => {
        let myArr = [],
             mycolor = ''
        for (var i =0; i<products.items.length; i++){
          if(products.items[i].availableOnline=== true){products.items[i].availableOnline = "Available";mycolor="green"}else if(products.items[i].availableOnline=== false){products.items[i].availableOnline = "Not Available";mycolor="red"}
          myArr.push({name: products.items[i].name,price: products.items[i].salePrice,status: products.items[i].availableOnline,color:mycolor, thumbs: products.items[i].thumbnailImage,rating: products.items[i].customerRating,upc: products.items[i].upc } )
    }
    console.log(products.items[0])
    this.setState({
      productsArr:  myArr,
      
    })
   
      })
      .catch((error) =>{
        Alert.alert(
          'Invalid Keyword/Product not found!!!',
          'Please check again',
          [
            {text: 'OK',onPress: () => this.props.dispatch(changePage(1))},
          ],
          { cancelable: false }
          )
      });
  }

  handleBack=()=>{
    this.props.dispatch(changePage(1))
  }
  handleForward = async (item) => {
    var response = await fetch("https://previews-bcit.herokuapp.com/barcode/" + item.upc)
    var json = await response.json()
    this.props.dispatch(exportProduct(json))
    this.props.dispatch(updateBarcode(item.upc))
    this.props.dispatch(updateTime(date))
    this.props.dispatch(changePage("Product"))

  }
  
  render() {
    
    getItem=(item,index)=> {
      var myitems = [item.name, item.price, item.status, item.thumbs, item.rating, item.upc,item.color];
      
      // console.log(myitems)
      return (


      <View style={styles.greyBox} key={index}>
          <View style={{alignItems:'flex-start',justifyContent:"center", backgroundColor:"#cccccc",height:40, marginBottom: 20, borderTopRightRadius:10, borderTopLeftRadius:10, paddingLeft:20}}>
  
                    <StarRating
                          disabled={true}
                          emptyStar="ios-star-outline"
                          fullStar="ios-star"
                          halfStar="ios-star-half"
                          iconSet="Ionicons"
                          maxStars={5}
                          starSize={15}
                          rating={parseInt(myitems[4])}
                          fullStarColor="white"
                          halfStarColor="white"
                          emptyStarColor="white"
                          halfStarEnabled
                          starPadding={10}
                        />


                    <TouchableOpacity style={{position: "absolute", right:15}}><Icon size={40} color="white" name="chevron-right" onPress={this.handleForward.bind(this,item)}/></TouchableOpacity>
          </View>
          <View style={{width:"100%",margin: 10, marginTop:0,flexDirection:"row",alignItems:"center"}}>
          <Image
              style={{width:100, height:100, borderRadius:10, marginRight:10}}
              source={{uri: myitems[3]}}
          />
          <View style={{width:250}}>
           <Text style={{fontWeight:"bold",fontSize:14, textAlign:"left"}}>{myitems[0]}</Text>
           <Text><Text style={{fontWeight:"bold",textAlign:"left"}}>Price: </Text>${myitems[1]}</Text>
           <Text><Text style={{fontWeight:"bold",textAlign:"left"}}>UPC: </Text>{myitems[5]}</Text>
           <Text style={{fontWeight:"bold",textAlign:"left"}}>Status: <Text style={{color:myitems[6]}}>{myitems[2]}</Text></Text>
         
           </View>
           </View>
      </View>


      ) ;
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:"100%" }}>
      <MyStatusBar backgroundColor={this.props.bottomcol} barStyle="light-content" />
      <View style={{ flex: 0.3, backgroundColor:this.props.bottomcol,width:"100%", }}>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.bottomcol,width:"100%", flexDirection:"row"}}>
        <TouchableOpacity style={{position: "absolute", left:15}}><Icon size={50} color="white" name="chevron-left" onPress={this.handleBack}/></TouchableOpacity>
          <Text style={{ color:this.props.ptext, fontSize:24, }}>SEARCH RESULTS</Text>
        </View>
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'flex-start',width:"100%", backgroundColor:this.props.bgcol}}>

         <ScrollView style={{flex:1, padding: 10,width:"100%", marginBottom: 56}}>
          
         { this.state.productsArr.map(getItem)}

          </ScrollView>
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
  greyBox:{
    backgroundColor: "#efefef",
    marginTop: 40,
    borderRadius:10
   

  },

});

function mapStateToProps(state){
  return{
    upc: state.CheckBarcode.upc,
    time: state.CheckBarcode.time,
    keyword: state.CheckBarcode.keyword,
		bgcol:state.CheckBarcode.bgcol,
    ptext:state.CheckBarcode.ptext,
		bottomcol:state.CheckBarcode.bottomcol
 
  }
}
export default connect(mapStateToProps)(Search)