import React, { Component, PropTypes } from 'react'
import {CameraRoll, Image,Text, ScrollView, StyleSheet, TouchableHighlight, View,TouchableOpacity,StatusBar, Alert } from 'react-native';
import {connect} from 'react-redux'
import {changePage,newProdImg} from '../redux/action'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CameraRollPicker from 'react-native-camera-roll-picker';



const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
class MyCameraRoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
    };
  }

  getSelectedImages(images, current) {
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
    });

    // console.log(current);
    // console.log(this.state.selected[0].uri);
  }


  handleBack=()=>{
    this.props.dispatch(changePage("AddProduct"))
  }
  handleChoose=()=>{
    this.props.dispatch(newProdImg(this.state.selected[0].uri))
    console.log(this.state.selected[0].uri)
    Alert.alert(
      'Image Uploaded Successfully',
      '',
      [
        {text: 'OK', onPress: () => this.props.dispatch(changePage("AddProduct"))},
        {text: 'Choose another one'},
      ],
      { cancelable: false }
    )
    
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:"100%" }}>
      <MyStatusBar backgroundColor={this.props.bottomcol} barStyle="light-content" />
      <View style={{ flex: 0.3, backgroundColor:this.props.bottomcol,width:"100%", }}>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.bottomcol,width:"100%", }}>
        <TouchableOpacity style={{position: "absolute", left:15}}><Icon size={50} color="white" name="chevron-left" onPress={this.handleBack}/></TouchableOpacity>
          <Text style={{ color:this.props.ptext, fontSize:24, }}>GALLERY</Text>
          <Text onPress={this.handleChoose} style={{ color:"white", fontSize:20,position: "absolute", right:15 }}>Select</Text>
        </View>
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
  
        <CameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={false}
          groupTypes='SavedPhotos'
          batchSize={5}
          maximum={1}
          selectSingleItem
          selected={this.state.selected}
          assetType='Photos'
          imagesPerRow={3}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)} />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff8f7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
 
});

function mapStateToProps(state) {
	return {
		Navpage:state.CheckBarcode.Navpage,
    ptext:state.CheckBarcode.ptext,
		bottomcol:state.CheckBarcode.bottomcol
	}
}

export default connect(mapStateToProps)(MyCameraRoll);
