import React, { Component } from 'react';
import { WebView,StyleSheet,View,Button } from 'react-native';
import {connect} from 'react-redux'
import {changePage} from '../redux/action'; 



class Google extends Component {
    exit=()=>{
        this.props.dispatch(changePage("Product"))
    }
  render() {
    return (
         
        <View style = {styles.container}>
       <View style={{position:"absolute", top:20,left:0,zIndex:99}}>
        <Button
            title="Done"
            onPress={this.exit}
        />  
        </View>
        <WebView
         source = {{ uri:
        'https://www.google.com/search?q='+this.props.upc}}
        style={{marginTop: 60,marginBottom:56}}
      />
  </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
       height: "100%",
       width:"100%",
       
    },

 })
function mapStateToProps(state){
    return{
      upc: state.CheckBarcode.upc,   
    }
  }
  export default connect(mapStateToProps)(Google)