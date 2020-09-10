import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

//import {Font} from 'expo'


import {connect} from "react-redux";
import {changeNavPage,changeNavPageToTab} from "../redux/action";

class Homepage extends React.Component {

	handleGoToBarcodeSearch=()=>{
		this.props.dispatch(changeNavPageToTab("Menu",0));
	}
	handleGoToKeywordSearch=()=>{
		this.props.dispatch(changeNavPageToTab("Menu",1));
	}	
	handleGoToProfile=()=>{
		this.props.dispatch(changeNavPageToTab("Menu",2));
	}	
	handleGoToSettings=()=>{
		this.props.dispatch(changeNavPageToTab("Menu",3));

	}
	

  render() {
	 
    return (
      <View style={[styles.container, {backgroundColor:this.props.navcol}]}>
       	<Image
				style={{width:200, height: 200, marginTop: 0, marginBottom: 30, resizeMode: "contain"}}
				source={require('../assets/whitelogo.png')}
			/>
			
			{/*	*/}
			
			<View style={{flexDirection:"row", bottom: 0}}>
			<TouchableOpacity 
				style={[styles.buttons, {backgroundColor:this.props.homebutt}]}	
				onPress={this.handleGoToBarcodeSearch}
			>
			<Icon style={styles.icons}  size={100} color="white" name="barcode-scan" />	
			<Text  style={[styles.label, {color:this.props.ptext}]}>BARCODE SEARCH</Text>
			</TouchableOpacity>			
			
			<TouchableOpacity 
				style={[styles.buttons, {backgroundColor:this.props.homebutt}]}
				onPress={this.handleGoToKeywordSearch}					
			>
				<Icon style={styles.icons}  size={100} color="white" name="search-web" />	
			<Text style={[styles.label, {color:this.props.ptext}]}>KEYWORD SEARCH</Text>
			</TouchableOpacity>
			</View>			
			
			
			<View style={{flexDirection:"row", bottom: 0}}>
			<TouchableOpacity 
				style={[styles.buttons, {backgroundColor:this.props.homebutt}]}	
				onPress={this.handleGoToProfile}				
			>
			<Icon2 style={{position:"absolute",left:50,top:1,opacity:0.4}}  size={100} color="white" name="user" />	
			<Text  style={[styles.label, {color:this.props.ptext}]}>PROFILE</Text>
			</TouchableOpacity>			
			
			<TouchableOpacity 
				style={[styles.buttons, {backgroundColor:this.props.homebutt}]}
				onPress={this.handleGoToSettings}					
			>
			<Icon style={styles.icons}  size={100} color="white" name="settings" />	
			<Text  style={[styles.label, {color:this.props.ptext}]}>SETTINGS</Text>
			</TouchableOpacity>
			</View>

			
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
		width:'100%',
		height:'100%'
  },
	buttons:{
		width:165,
		height:100,
		padding:12,
		margin:10,
		justifyContent:"center",
		borderRadius: 10

	},
	label:{
		fontSize:18,
		textAlign:"center",
		fontWeight:"bold"
	},
	icons:{
		position:"absolute", 
		left:35,
		top:1, 
		opacity:0.4
	}
});

function mapStateToProps(state){
  return{
    Navpage:state.CheckBarcode.Navpage,
    navcol:state.CheckBarcode.navcol,
    tabcol:state.CheckBarcode.tabcol,
    ptext:state.CheckBarcode.ptext,
    thelogo:state.CheckBarcode.thelogo,
		homebutt:state.CheckBarcode.homebutt
  }
}

export default connect(mapStateToProps)(Homepage)
