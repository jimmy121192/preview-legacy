import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage,Alert,NetInfo} from 'react-native'
import {connect} from "react-redux";
import {changeNavPage} from "../redux/action";
import CheckBox from 'react-native-check-box'
//firebase
import firebase from './config/firebaseconfig';




class LogIn extends Component {
	
	constructor(props){
		super(props)

		this.state = { 
			email: '',
			password: '',
			error: null,
			pages: 0,
			isChecked: false,
		}

	}

	//Autologin
	componentWillMount=async ()=>{
		try{
			var myaccess = await AsyncStorage.getItem("access")

			//check available token
			if(myaccess==="granted"){
				this.props.dispatch(changeNavPage("HomePage"));
			}
		} catch(error){
		  alert(error)
		}

		NetInfo.isConnected.fetch().then(isConnected => {
			if(!isConnected){
				Alert.alert(
					'No Internet Connection',
					'Please check your Internet Connection before relaunching the application',
					[
					  {text: 'OK'},
					],
					{ cancelable: false }
				  )
			}
			
		  });
	}


	handleLogIn=()=>{
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
		.then(u => {

					//set up token
					if(this.state.isChecked===true){
						AsyncStorage.setItem('access',"granted");
					}
				
				this.props.dispatch(changeNavPage("HomePage"));
		})
		.catch(error=>{
			this.setState({error: error.message})
			Alert.alert(
				'Incorrect Username/Password',
				'Please check again',
				[
				  {text: 'OK'},
				],
				{ cancelable: false }
			  )
		})
	}
	handleReset=()=>{
		this.props.dispatch(changeNavPage("ResetPassword"));
	}
	handleSignUp=()=>{
		this.props.dispatch(changeNavPage("SignUp"));
	}
	handleEmail=(text)=>{
		this.setState({
			email:text
		})
	}
	
	handlePassword=(text)=>{
		this.setState({
			password:text
		})
	}
	
  render() {
	
	
    return (
		<KeyboardAvoidingView style={[styles.container, {backgroundColor:this.props.bottomcol}]} behavior="padding" enabled>
			<Image
						style={{width:200, height: 200, marginTop: -105, marginBottom: 30, resizeMode: "contain"}}
						source={require('../assets/whitelogo.png')}
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
							
							}}
						keyboardType={"email-address"}
						autoCapitalize="none"
						placeholder="Email"
						onChangeText={(text)=>{this.handleEmail(text)}}	

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
							marginTop:5
							}}
						placeholder="Password"
						secureTextEntry={true}
						onChangeText={(text)=>{this.handlePassword(text)}}	

					/>
								
				<CheckBox
					style={{padding: 10,width:300}}
					checkBoxColor={'white'}
					onClick={()=>{
					
					this.setState({
						isChecked:!this.state.isChecked
					})
					}}
					isChecked={this.state.isChecked}
					rightText={"Stay logged in"}
					rightTextStyle={{color:"white"}}
				/>	
 				<View style={{flexDirection:"row"}}>
								 <TouchableOpacity 
									style={[styles.buttons, {backgroundColor:this.props.homebutt}]}
									//onPress ={this.handleButton.bind(this,2)}onPress={this.handleLogIn}
									onPress={this.handleSignUp}
								>
								<Text  style={styles.buttonText}>SIGN UP</Text>
								</TouchableOpacity>


								<TouchableOpacity
									style={[styles.buttons, {backgroundColor:this.props.homebutt}]}
								    //onPress ={this.handleButton.bind(this,1)}
									onPress={()=> this.handleLogIn(this.state.email, this.state.password)}
								>
								<Text style={styles.buttonText}>LOG IN</Text>
								</TouchableOpacity>

						
						
							

				</View>
				<TouchableOpacity style={{paddingTop: 10,paddingBottom: 10,justifyContent:"flex-start", flexDirection:"column", }} onPress={this.handleReset}>
                          <Text style={{color:"white"}}> Forgot your password?</Text>
                          </TouchableOpacity>	
				
				
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
		marginTop:20,
		margin:5,
		borderRadius:10,
		flexDirection:"column",
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
		bottomcol:state.CheckBarcode.bottomcol,
		homebutt:state.CheckBarcode.homebutt
  }
}

export default connect(mapStateToProps)(LogIn)
