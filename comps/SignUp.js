import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Button, Alert,KeyboardAvoidingView } from 'react-native';
import {connect} from "react-redux";
import {changeNavPage,userfname,userlname} from "../redux/action";
import firebase from './config/firebaseconfig'
import { auth } from 'firebase';


class SignUp extends React.Component {

	constructor(props){
		super(props)

		this.state = { 
			firstname: '',
			lastname: '',
			email: '',
			password: '', 
			confirmpass: '',
			error: ''
		}

	}

	handleFname=(val)=>{
		this.props.dispatch(userfname(val))
		}
		handleLname=(val)=>{
		this.props.dispatch(userlname(val))
		}

	handleSignUp=()=>{
		//password match
		if (this.state.password === this.state.confirmpass){
			firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
				if(this.state.error === ''){
					this.saveNewUser();		
				}
			Alert.alert(
				'Successful!!!',
				'Your Account is activated',
				[
				  {text: 'OK', onPress: () => this.props.dispatch(changeNavPage("LogIn"))},
				],
				{ cancelable: false }
			  )
			//create user
			
			}).catch(error =>{
				this.setState({error: error.message})
			})
			
		}
			//if password dont match
			else{
				this.setState({error:"Passwords do not match"})
			}
	}
	
	// going back to the login page
	handleBack=()=>{
		this.props.dispatch(changeNavPage("LogIn"));
	}
	
	saveNewUser=()=> {
		var firebase = require('firebase');
		  if (firebase.auth().currentUser) {
			currentUser = firebase.auth().currentUser;
			if (currentUser) {
				firebase.database().ref('users/' + currentUser.uid).set({
					userID: currentUser.uid,
					email: currentUser.email,
					firstname: this.props.UserFName,
					lastname: this.props.UserLName,
				})
			}
			console.log(currentUser);
		  }
		}


  render() {
	 
    return (
      <KeyboardAvoidingView style={[styles.container, {backgroundColor:this.props.bottomcol}]} behavior="padding" enabled>

        <Text style={{fontSize:35,textAlign:"center",color: "white",margin:10, marginBottom:40}}>SIGN UP</Text>
				
					
			<TextInput
						style={{
							width:300,
							height:40,
							backgroundColor:"#FFFFFF",
							fontSize: 20,
							paddingLeft: 15,
							borderTopLeftRadius:10,
							borderTopRightRadius:10,
							margin:2
							}}
						placeholder="First Name"
						onChangeText={(val)=>this.handleFname(val)}
         			

			 />
				
			
			<TextInput
						style={{
							width:300,
							height:40,
							backgroundColor:"#FFFFFF",
							fontSize: 20,
							paddingLeft: 15,
							borderBottomLeftRadius:10,
							borderBottomRightRadius:10,
							}}
						placeholder="Last Name"
						onChangeText={(val)=>this.handleLname(val)}
         			

			/>
			
			
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
						keyboardType="email-address"
						placeholder="email@previews.ca"
						onChangeText={email => this.setState({ email })}
         				value={this.state.email}
			/>
			
			
			<TextInput
						style={{
							width:300,
							height:40,
							backgroundColor:"#FFFFFF",
							fontSize: 20,
							paddingLeft: 15,
							borderTopLeftRadius:10,
							borderTopRightRadius:10,
							marginBottom:2
							}}
						placeholder="Password"
						secureTextEntry={true}
						onChangeText={password => this.setState({ password })}
         				 value={this.state.password}
			 />
			<TextInput
						style={{
							width:300,
							height:40,
							backgroundColor:"#FFFFFF",
							fontSize: 20,
							paddingLeft: 15,
							borderBottomLeftRadius:10,
							borderBottomRightRadius:10,
							}}
						placeholder="Confirm Password"
						secureTextEntry={true}
						onChangeText={confirmpass => this.setState({confirmpass})}

			/>

			<Text style={{marginTop:10,color:"red"}}> {this.state.error}</Text>

			<View style={{flexDirection:"row", marginTop:30}}>
					<TouchableOpacity 
						style={[styles.buttons, {backgroundColor:this.props.homebutt}]}
						//onPress ={this.handleButton.bind(this,2)}onPress={this.handleLogIn}
						onPress={this.handleBack}
					>
					<Text style={styles.buttonText}>BACK</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.buttons, {backgroundColor:this.props.homebutt}]}
						//onPress ={this.handleButton.bind(this,1)}
						onPress={this.handleSignUp}
					>
					<Text style={styles.buttonText}>CREATE</Text>
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
		padding:7,
	
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
		bottomcol:state.CheckBarcode.bottomcol,
		homebutt:state.CheckBarcode.homebutt
  }
}

export default connect(mapStateToProps)(SignUp)
