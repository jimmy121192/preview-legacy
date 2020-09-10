import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, StatusBar,AsyncStorage,Linking } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux'
import firebase from './config/firebaseconfig'
import {changePage,changeNavPage,changeTheme} from '../redux/action'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
{label: 'original', value: 0 },
{label: 'dark', value: 1 },
{label: 'BCIT', value: 2 }
];

const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);

class Settings extends Component {
state={
  value:''
}



handleTheme=(value)=>{
  
  var darkArr;

  
  this.setState({value:value})
  
    if(value===0){
    
      this.props.dispatch(changeTheme("white", "#614B8E", "#DEDDEC", "white", "black", "rgba(222, 221, 236, 0.5)", require('../assets/purplelogo.png'), "#614B8E", 0, "#927eb0", "#614B8E"));
    darkArr =[];
    darkArr.push("white", "#614B8E", "#DEDDEC", "white", "black", "rgba(222, 221, 236, 0.5)", require('../assets/purplelogo.png'), "#614B8E", 0, "#927eb0", "#614B8E");
    AsyncStorage.setItem('theme',JSON.stringify(darkArr))
    
    
  } 
  else if(value===1){

    this.props.dispatch(changeTheme("#515151", "#444445", "#444445", "white", "white", "rgba(68, 68, 69, 0.5)", require('../assets/whitelogo.png'), "#444445", 1, "#515151", "white"));
    darkArr =[];
    darkArr.push("#515151", "#444445", "#444445", "white", "white", "rgba(68, 68, 69, 0.5)", require('../assets/whitelogo.png'), "#444445", 1, "#515151", "white");
    AsyncStorage.setItem('theme',JSON.stringify(darkArr))
  
  }
  else if(value===2){
      
    this.props.dispatch(changeTheme("#37638e", "#153f68", "#153f68", "yellow", "white", "rgba(21, 63, 104, 0.5)", require('../assets/whitelogo.png'), "#153f68", 2, "#37638e", "yellow"));
    darkArr =[];
    darkArr.push("#37638e", "#153f68", "#153f68", "yellow", "white", "rgba(21, 63, 104, 0.5)", require('../assets/whitelogo.png'), "#153f68", 2, "#37638e", "yellow");
    AsyncStorage.setItem('theme',JSON.stringify(darkArr))

  }

  }

goToTerms=()=>{
    this.props.dispatch(changePage("Terms"))
}
goToCredits=()=>{
    this.props.dispatch(changePage("Credits"))
}
handleEmail = ()=> {
  Linking.openURL('mailto:teampreviews@gmail.com?subject=From Previewer with love&body=Feedback') 
  }


handleBack=()=>{
  this.props.dispatch(changeNavPage("HomePage"))
}
render() {

      return (


          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:"100%", backgroundColor:this.props.bgcol }}>
          <MyStatusBar backgroundColor="#614B8E" barStyle="light-content" />
          <View style={{ flex: 0.3, backgroundColor:this.props.bottomcol,width:"100%", }}>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.bottomcol,width:"100%", }}>
            <TouchableOpacity style={{position: "absolute", left:15}}><Icon size={50} color='white' name="chevron-left" onPress={this.handleBack}/></TouchableOpacity>
              <Text style={{ color:this.props.ptext, fontSize:24}}>SETTINGS</Text>
            </View>
            <View style={{ flex: 8, alignItems: 'center', justifyContent: 'space-evenly',flexDirection:"column",width:"100%", marginBottom:56}}>
              
                <View style={{width:"100%", alignItems: 'center', justifyContent:"center"}}>
                  <View style={{backgroundColor:this.props.tabcol,width:"95%",height:50, borderTopLeftRadius:10, borderTopRightRadius:10, flexDirection:"row",marginTop:30,}}>
                      <Text style={{fontSize:20, padding:12, color:this.props.stext}}>Themes</Text>

                      
                </View> 
                        
                  <View style={{backgroundColor:this.props.radiocol,width:"95%",height:130, borderBottomLeftRadius:10, borderBottomRightRadius:10, flexDirection:"row", marginBottom:3}}>
                  <RadioForm
                        style={{width:"100%",justifyContent:"space-evenly", alignItems:"center"}}
                        radio_props={radio_props}
                        initial={this.props.radioval}
                        formHorizontal={true}
                        labelHorizontal={false}
                        buttonColor={this.props.stext}
                        animation={true}
                        labelStyle={{fontWeight: "bold", color: this.props.stext, marginTop:7}}
                        onPress={(value) => {this.handleTheme(value)}}
                      />

                </View>   
                </View>



                  <View style={{width:"100%", alignItems: 'center', justifyContent:"center"}}>
                  <TouchableOpacity
                  style={{
                    marginTop:30,
                    marginBottom:3,
                    backgroundColor:this.props.tabcol,
                    width:"95%",
                    height:50, 
                    borderTopLeftRadius:10, 
                    borderTopRightRadius:10
                  }}
                    
                    onPress={this.goToCredits}
                
                  >
                      <Text style={{fontSize:20, padding:12, color:this.props.stext}}>Credits</Text>


                </TouchableOpacity>  
                                
                
                  <TouchableOpacity
                  style={{
                    
                    backgroundColor:this.props.tabcol,
                    width:"95%",
                    height:50, 
                    marginBottom:3,
                    
                  }}
                      onPress={this.goToTerms}
                
                >
                      <Text style={{fontSize:20, padding:12, color:this.props.stext}}>Terms of Use</Text>


                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor:this.props.tabcol,
                    width:"95%",
                    height:50, 
                    borderBottomLeftRadius:10, 
                    borderBottomRightRadius:10
                  }}
                    
                    onPress={this.handleEmail}
                
                  >
                      <Text style={{fontSize:20, padding:12, color:this.props.stext}}>Send Feedback</Text>


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
  alignItems: 'center',
  
}
});

function mapStateToProps(state){
return{
  bgcol:state.CheckBarcode.bgcol,
  navcol:state.CheckBarcode.navcol,
  tabcol:state.CheckBarcode.tabcol,
  ptext:state.CheckBarcode.ptext,
  stext:state.CheckBarcode.stext,
  radiocol:state.CheckBarcode.radiocol,
  thelogo:state.CheckBarcode.thelogo,
  bottomcol:state.CheckBarcode.bottomcol,
  radioval:state.CheckBarcode.radioval,
  homebutt:state.CheckBarcode.homebutt,
  ttext:state.CheckBarcode.ttext

}
}
export default connect(mapStateToProps)(Settings)