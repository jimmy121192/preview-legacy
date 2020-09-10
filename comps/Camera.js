import React, { Component } from 'react'
import { RNCamera } from 'react-native-camera';
import { StyleSheet, Text, View, StatusBar, Vibration,Image,CameraRoll, TouchableOpacity,Alert} from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Viewfinder2 from './Viewfinder2';
import {changePage,newProdImg} from '../redux/action';  //import redux methods
import {connect} from 'react-redux';
import Torch from 'react-native-torch';



class Camera extends Component{
  constructor(props) {
    super(props);
  this.state = {
    flashMode:true,
    flashIcon:"flash",

  };
}

exit=()=>{
  this.props.dispatch(changePage("AddProduct"))
}




takePicture=async()=> {
if (this.camera) {
const options = { quality: 0.5,width:300,height:300, base64: true };
const data = await this.camera.takePictureAsync(options);
let saveResult = await CameraRoll.saveToCameraRoll(data.uri, 'photo');

this.props.dispatch(newProdImg(saveResult))

Alert.alert(
  'Product Image Updated!',
  '',
  [
    {text: 'OK', onPress: () => this.props.dispatch(changePage("AddProduct"))},
    {text: 'Take another picture'},
  ],
  { cancelable: false }
)
}
};

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
    
    <View style={styles.container}>
    <View style={{ flex: 1, width:"100%" }}>
    
    <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <Viewfinder2/>

        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
       
       <View style={styles.menu}>
           
       </View>
       <TouchableOpacity style={{position: 'absolute', bottom: 70, zIndex:10}}>
            <Icon2 size={70} color="white" name="ios-radio-button-on" onPress={this.takePicture}/>             
            </TouchableOpacity>
       <View style={styles.SubBar}>
         <TouchableOpacity><Icon size={24} color="white" name="exit-to-app" onPress={this.exit}/></TouchableOpacity>
          <TouchableOpacity></TouchableOpacity>
          <TouchableOpacity><Icon size={24} color="white" name={this.state.flashIcon} onPress={this.handleFlash.bind(this)}/></TouchableOpacity>
        </View>


        </View>
      
    </View>
    
    </View>
    
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  SubBar: {
    position: 'absolute',
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    bottom: 90,
    zIndex:5,
    justifyContent:"space-around",
    backgroundColor: "rgba(122,122,122,0.4)", 
    width: 180,
    height:40,  
    borderRadius:5
  }
});
function mapStateToProps(state){
  return{
    upc: state.CheckBarcode.upc,
    newProdImg: state.CheckBarcode.newProdImg,
  }
}
export default connect(mapStateToProps)(Camera)
