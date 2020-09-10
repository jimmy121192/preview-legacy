import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, StatusBar,ScrollView,Switch } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {connect} from 'react-redux'
import firebase from './config/firebaseconfig'

import {changePage,changeNavPage,changeTheme} from '../redux/action'

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class Credits extends Component {
 

 
  handleBack=()=>{
    this.props.dispatch(changePage(3))
  }
  render() {

        return (


            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:"100%", backgroundColor:this.props.bgcol }}>
            <MyStatusBar backgroundColor="#614B8E" barStyle="light-content" />
            <View style={{ flex: 0.3, backgroundColor:this.props.bottomcol,width:"100%", }}>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.bottomcol,width:"100%", }}>
              <TouchableOpacity style={{position: "absolute", left:15}}><Icon size={50} color='white' name="chevron-left" onPress={this.handleBack}/></TouchableOpacity>
                <Text style={{ color:this.props.ptext, fontSize:24}}>TEAM PREVIEWS</Text>
              </View>
              <View style={{ flex: 8, alignItems: 'center', justifyContent: 'space-evenly',flexDirection:"column",width:"100%", marginBottom:56 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly',flexDirection:"row",width:"100%"}}>
                    <Image
                      style={{ width:80, height:80, justifyContent:"flex-start", borderRadius: 40,zIndex:10}}
                      source={require('../assets/eveyen.jpg')}
                    >
                    </Image>
                    <View style={{width:"60%",height:"100%", alignItems:"center", justifyContent:"center"}}>
                          <Text style={{fontWeight:"bold",fontSize:18,color:this.props.ttext}}>Eveyen Sobremisana</Text>
                          <Text style={{color:this.props.stext}}>Project Manager</Text>
                          <Text style={{color:this.props.stext}}>Founder</Text>
                      </View> 
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly',flexDirection:"row",width:"100%"}}>
                    <Image
                      style={{ width:80, height:80, justifyContent:"flex-start", borderRadius: 40,zIndex:10}}
                      source={require('../assets/jimmy.jpg')}
                     >
                    </Image>
                    <View style={{width:"60%",height:"100%", alignItems:"center", justifyContent:"center"}}>
                          <Text style={{fontWeight:"bold",fontSize:18,color:this.props.ttext}}>Jimmy Truong</Text>
                          <Text style={{color:this.props.stext}}>Project Developer</Text>
                          <Text style={{color:this.props.stext}}>Quality Assurance</Text>
                      </View> 
                </View>


                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly',flexDirection:"row",width:"100%"}}>
                    <Image
                      style={{ width:80, height:80, justifyContent:"flex-start", borderRadius: 40,zIndex:10}}
                      source={require('../assets/sean.jpg')}
                      >
                    </Image>
                    <View style={{width:"60%",height:"100%", alignItems:"center", justifyContent:"center"}}>
                          <Text style={{fontWeight:"bold",fontSize:18,color:this.props.ttext}}>Sean Cunningham</Text>
                          <Text style={{color:this.props.stext}}>UX/UI Designer</Text>
                          <Text style={{color:this.props.stext}}>Wireframing</Text>
                      </View> 
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly',flexDirection:"row",width:"100%"}}>
                    <Image
                      style={{ width:80, height:80, justifyContent:"flex-start", borderRadius: 40,zIndex:10}}
                      source={require('../assets/hong.jpg')}
                      >
                    </Image>
                    <View style={{width:"60%",height:"100%", alignItems:"center", justifyContent:"center"}}>
                          <Text style={{fontWeight:"bold",fontSize:18,color:this.props.ttext}}>Hong Yu</Text>
                          <Text style={{color:this.props.stext}}>Branding Designer</Text>
                         
                      </View> 
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly',flexDirection:"row",width:"100%", padding:20}}>
                <Text style={{textAlign:"justify", color:this.props.stext, fontSize:16}}>Special thanks to BCIT instructors Henry Leung and Ramin Shadmehr for helping us make this app possible.</Text>
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
    ttext:state.CheckBarcode.ttext,
		bottomcol:state.CheckBarcode.bottomcol,
	
	
  }
}
export default connect(mapStateToProps)(Credits)