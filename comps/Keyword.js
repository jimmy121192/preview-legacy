import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, Button,StatusBar,TextInput,TouchableOpacity,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux'
import {changePage, changeNavPage,keywordSeach} from '../redux/action'

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class Keyword extends Component {
state={
  mykey:null
}

handleBack=()=>{
  this.props.dispatch(changeNavPage("HomePage"))
}
handleType=(val)=>{
//   if (/\s/.test(val)) {
//     this.setState({
//       mykey:val.replace(/ /g,'')
//     })
// }
  this.setState({
    mykey:val.replace(/ /g,'')
  })
}
handleLookup=()=>{
if(this.state.mykey){
  this.props.dispatch(keywordSeach(this.state.mykey))
  this.props.dispatch(changePage("Search"))
}
else{
  Alert.alert("Please type something")
}

}
  render() {

    
    return (
        
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:"100%", backgroundColor:this.props.bgcol }}>
      <MyStatusBar backgroundColor={this.props.bottomcol} barStyle="light-content" />
      <View style={{ flex: 0.3, backgroundColor:this.props.bottomcol,width:"100%", }}>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.bottomcol,width:"100%", }}>
        <TouchableOpacity style={{position: "absolute", left:15}}><Icon size={50} color="white" name="chevron-left" onPress={this.handleBack}/></TouchableOpacity>
          <Text style={{ color:this.props.ptext, fontSize:24 }}>KEYWORD SEARCH</Text>
        </View>
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center', marginBottom:56 }}>
               <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Image
                  source={this.props.thelogo}
                  style={{width: 155, height: 170}}
                /> 
              </View>
              <View style={{ flex: 1,flexDirection:"row", justifyContent: 'flex-start'}}>
              <TextInput style={{ backgroundColor:"#efefef", width:200, height:40, borderRadius:7,textAlign:'center'}}
                  onChangeText={this.handleType}
                  placeholder="Enter your keyword here!"
               >
               </TextInput>
               <TouchableOpacity
                >
                <Icon size={40} color={this.props.ttext} name="database-search" onPress={this.handleLookup}/>
                </TouchableOpacity>
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
  }
});

function mapStateToProps(state){
  return{
    upc: state.CheckBarcode.upc,
    time: state.CheckBarcode.time,
		bgcol:state.CheckBarcode.bgcol,
    ptext:state.CheckBarcode.ptext,
    ttext:state.CheckBarcode.ttext,
		bottomcol:state.CheckBarcode.bottomcol,
		thelogo:state.CheckBarcode.thelogo
 
  }
}
export default connect(mapStateToProps)(Keyword)