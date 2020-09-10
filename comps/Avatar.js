import React, { Component, PropTypes } from 'react'
import {Text,StyleSheet, TouchableHighlight, View,TouchableOpacity,StatusBar, Alert } from 'react-native';
import {connect} from 'react-redux'
import {changePage,newProdImg,changeNavPageToTab} from '../redux/action'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CameraRollPicker from 'react-native-camera-roll-picker';
import RNFetchBlob from 'rn-fetch-blob';
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;



const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
class Avatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
      imageName:''
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


  handleGoBack=()=>{
    this.props.dispatch(changeNavPageToTab("Menu",2));
  }
  handleChoose= async()=>{


    var firebase = require('firebase');
    if (firebase.auth().currentUser) {
      currentUser = firebase.auth().currentUser;
      if (currentUser) {
        
        var imgF = await RNFetchBlob.fs.readFile(this.state.selected[0].uri, "base64");
        var blob = await Blob.build(imgF, {type: 'image/jpg;BASE64'});
        this.blob = blob;

        var imgRef = firebase.storage().ref('users/'+currentUser.uid+"/userAvatar/"); 
        imgRef.put(this.blob, {contentType:'image/jpg'}).then((snapshot)=>{
        firebase.storage().ref(snapshot.metadata.fullPath).getDownloadURL().then((url)=>{
             
            //update firebase database with download url   
          firebase.database().ref('users/'+currentUser.uid).update({
            userAvatar: url
        });

           })
        });
        
        
      }
    }
    

   




    Alert.alert(
      'Avatar Uploaded Successfully',
      '',
      [
        {text: 'OK', onPress: () => this.props.dispatch(changeNavPageToTab("Menu",2))},
        {text: 'Choose another one'},
      ],
      { cancelable: false }
    )
    
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:"100%"}}>
      <MyStatusBar backgroundColor={this.props.bottomcol} barStyle="light-content" />
      <View style={{ flex: 0.3, backgroundColor:this.props.bottomcol,width:"100%", }}>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.bottomcol,width:"100%", }}>
        <TouchableOpacity style={{position: "absolute", left:15}}><Icon size={50} color="white" name="chevron-left" onPress={this.handleGoBack}/></TouchableOpacity>
          <Text style={{ color:this.props.ptext, fontSize:24, }}>PROFILE PICTURE</Text>
          <Text onPress={this.handleChoose} style={{ color:"white", fontSize:20,position: "absolute", right:15 }}>Add</Text>
        </View>
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center'}}>
  
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
		bgcol:state.CheckBarcode.bgcol,
    ptext:state.CheckBarcode.ptext,
		bottomcol:state.CheckBarcode.bottomcol,
		stext:state.CheckBarcode.stext,
		ttext:state.CheckBarcode.ttext
	}
}

export default connect(mapStateToProps)(Avatar);
