//This is where we are going to navigate from the login page to Main/SignUp page

import React from 'react';
import { StyleSheet, Text, View,StatusBar,AsyncStorage } from 'react-native';
import Menu from "./Menu";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import HomePage from "./HomePage";
import {connect} from "react-redux";
import Settings from './Settings';
import Profile from './Profile';
import AddProduct from './AddProduct';
import ResetPassword from './ResetPassword';
import {changeTheme} from '../redux/action'
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class Form extends React.Component {

componentDidMount= async()=> {
		let mytheme = await AsyncStorage.getItem("theme");
    let mychosetheme = JSON.parse(mytheme);

	var b = this.props.dispatch(changeTheme(mychosetheme[0],mychosetheme[1],mychosetheme[2],mychosetheme[3],mychosetheme[4],mychosetheme[5],mychosetheme[6],mychosetheme[7],mychosetheme[8],mychosetheme[9],mychosetheme[10]));
	console.log(b)
}

  render() {
     var curpage = "";
    
    if (this.props.Navpage === "LogIn"){
      curpage = <LogIn />
    }else if (this.props.Navpage === "HomePage"){
      curpage = <HomePage />
    }else if (this.props.Navpage === "SignUp"){
      curpage = <SignUp />
    }else if (this.props.Navpage === "Menu"){
      curpage = <Menu />
    }
    else if (this.props.Navpage === "Settings"){
      curpage = <Settings />
    }
    else if (this.props.Navpage === "Profile"){
      curpage = <Profile />
    }
    else if (this.props.Navpage === "ResetPassword"){
      curpage = <ResetPassword />
    }
    
 
    
    return (
      <View style={styles.container}>
      <MyStatusBar backgroundColor="#614B8E" barStyle="light-content" />
         {curpage}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
	return {
		Navpage:state.CheckBarcode.Navpage
	}
}

export default connect(mapStateToProps)(Form);
