

import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Button, Alert,KeyboardAvoidingView } from 'react-native';
import {connect} from "react-redux";
import {changeNavPage,userfname,userlname} from "../redux/action";
import firebase from './config/firebaseconfig'



class ResetPassword extends React.Component {

	constructor(props){
		super(props)

		this.state = { 
			email: null,
		}

	}


	handleReset=()=>{
		//password match
		if(this.state.email){
			firebase.auth().sendPasswordResetEmail(this.state.email);
			Alert.alert(
				'Successful!!!',
				'Password Reset Request sent',
				[
				  {text: 'OK', onPress: () => this.props.dispatch(changeNavPage("LogIn"))},
				],
				{ cancelable: false }
			  )
		}
		else{
			Alert.alert(
				'Email not found!!!',
				'Please type in your email',
				[
				  {text: 'OK'},
				],
				{ cancelable: false }
			  )
		}
        
			//create user
	
	}
	
	// going back to the login page
	handleBack=()=>{
		this.props.dispatch(changeNavPage("LogIn"));
    }
    




  render() {
	 
    return (
      <KeyboardAvoidingView style={[styles.container, {backgroundColor:this.props.bottomcol}]} behavior="padding" enabled>

        <Text style={{fontSize:35,textAlign:"center",color: "white",margin:10, marginBottom:40}}>PASSWORD RESET</Text>
			
			
			<TextInput
						style={{
							width:300,
							height:40,
							backgroundColor:"#FFFFFF",
							fontSize: 20,
							paddingLeft: 15,
							margin:10,
							borderRadius:10,
							}}
						autoCapitalize="none"
						placeholder="your email"
						onChangeText={email => this.setState({ email })}
         				value={this.state.email}
			/>
			<View style={{flexDirection:"row", marginTop:30}}>
                            
                    
					<TouchableOpacity 
						style={[styles.buttons, {backgroundColor:this.props.homebutt}]}
						onPress={this.handleBack}
					>
					<Text style={styles.buttonText}>BACK</Text>
					</TouchableOpacity>
				<TouchableOpacity 
						style={[styles.buttons, {backgroundColor:this.props.homebutt}]}
						onPress={this.handleReset}
					>
					<Text style={styles.buttonText}>RESET</Text>
					</TouchableOpacity>
		
			</View>

      </KeyboardAvoidingView>
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
		width:145,
		height:40,
		padding:10,
	
		marginRight:5,
		borderRadius:10,
	},	
	buttonText:{
		fontSize:16,
		textAlign:"center",
		color: "white",
	}

});

function mapStateToProps(state){
  return{
		Navpage:state.CheckBarcode.Navpage,
		UserFName:state.CheckBarcode.firstname,
		UserLName:state.CheckBarcode.lastname,
		homebutt:state.CheckBarcode.homebutt,
		bottomcol:state.CheckBarcode.bottomcol,
  }
}

export default connect(mapStateToProps)(ResetPassword)


