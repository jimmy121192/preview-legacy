import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet,TouchableOpacity, Alert, CameraRoll } from 'react-native'
import Dialog from "react-native-dialog";
import Viewfinder from './Viewfinder';
import {connect} from 'react-redux'
import {changePage, updateBarcode,updateTime,flash,exportProduct,changeNavPage} from '../redux/action';
import moment from 'moment';  // for occured time
import Torch from 'react-native-torch';
var date = moment().format("MMM Do YYYY"); //occured time
class SubBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      image: null,
      view: true,
      searchBox: false,
      flashMode:true,
      flashIcon:"flash",
      inpText:''
    };
  }


  handleInput=(val)=>{
    this.setState({
      inpText: val
    })

  }
  sendInput = async () => {
    let n = this.state.inpText.length;
    if(n===12){
      var response = await fetch("https://previews-bcit.herokuapp.com/barcode/" + this.state.inpText)
      var json = await response.json()
      this.props.dispatch(exportProduct(json))    
      this.props.dispatch(updateBarcode(this.state.inpText));
      this.props.dispatch(updateTime(date));
      this.props.dispatch(changePage("Product"))
    }
    else if (n===13){
      var response = await fetch("https://previews-bcit.herokuapp.com/barcode/" + this.state.inpText.substr(1))
      var json = await response.json()
      this.props.dispatch(exportProduct(json))
      this.props.dispatch(updateBarcode(this.state.inpText));
      this.props.dispatch(updateTime(date));
      this.props.dispatch(changePage("Product"))
    }
    else {   
      Alert.alert(
        "Wrong UPC's format",
        'Only UPC-A/EAN-13 is accepted',
        [
          {text: 'OK', 
          onPress: () => this.handleSearch},
        ],
        { cancelable: false }
        )
    }   
  }

//When press on Exit 
 exit=()=>{
  this.props.dispatch(changeNavPage("HomePage"))
 }

    

  handleSearch=()=> {
    this.setState(
      { searchBox: !this.state.searchBox,
        view: !this.state.view       
      })
    } 

  renderViewfinder = () => {
    if (this.state.view == true) {
        return (
        <Viewfinder/>
        );
    } else {
        return null;
    }
  }

  renderSearchBox = () => {
    if (this.state.searchBox == true) {
      return (
        <Dialog.Container visible={true}>
              <Dialog.Title>Enter UPC</Dialog.Title>
              <Dialog.Input
              maxLength={13}
              placeholder="UPC-A (12 digits)"
              onChangeText={this.handleInput}
              keyboardType="number-pad"
              >
              </Dialog.Input>
              <Dialog.Button label="Cancel" onPress={this.handleSearch}/>
              <Dialog.Button label="Search" onPress={this.sendInput}/>
        </Dialog.Container>
      );
    } else {
        return null;
    }
  }

    async handleFlash() {
    if(this.state.flashMode===true){
      Torch.switchState(true);
      this.setState({
        flashMode: !this.state.flashMode,
        flashIcon:"flash-off"
      })
    }
    else{
      Torch.switchState(false);
      this.setState({
        flashMode: !this.state.flashMode,
        flashIcon:"flash"
      })
    }
      
    };

    render() {


      return (
        
        <View  style={styles.container}>
          {this.renderViewfinder()}
          {this.renderSearchBox()} 
          
          <View style={styles.SubBar}>
          <TouchableOpacity><Icon size={24} color="white" name="exit-to-app" onPress={this.exit}/></TouchableOpacity>
          <TouchableOpacity><Icon size={24} color="white" name="barcode" onPress={this.handleSearch}/></TouchableOpacity>
          <TouchableOpacity><Icon size={24} color="white" name={this.state.flashIcon} onPress={this.handleFlash.bind(this)}/></TouchableOpacity>

          </View>
        </View>
        
      );
    }
  } 

const styles = StyleSheet.create({
  container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
  SubBar: {
    position: 'absolute',
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    alignSelf:"center",
    bottom: 70,
    justifyContent:"space-evenly",
    backgroundColor: "rgba(122,122,122,0.6)", 
    width: 180,
    height:50,  
    borderRadius:5
  }
});

function mapStateToProps(state){
  return{
    upc: state.CheckBarcode.upc,
    time: state.CheckBarcode.time,
 
  }
}
export default connect(mapStateToProps)(SubBar)