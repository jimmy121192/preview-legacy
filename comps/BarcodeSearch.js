import React from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, Text, View, StatusBar, Vibration} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';  // for occured time
import {updateBarcode, updateTime,changePage,exportProduct} from '../redux/action';  //import redux methods
import {connect} from 'react-redux';
import SubBar from './SubBar';



var date = moment().format("MMM Do YYYY"); //occured time


const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class BarcodeSearch extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    autoFocus: 'on',
    type: 'back',
    barcodeScanning: false,
    permissionsGranted: true, 
    barcodeNum: '',
    time:'',

  };
}

isReading = false;

onBarCodeRead = async (barcodes) => {
    if(this.isReading){
      return false;
    }
    this.isReading = true;
    var response = await fetch("https://previews-bcit.herokuapp.com/barcode/" + barcodes.data.substr(1))
    var json = await response.json()
    this.props.dispatch(exportProduct(json))
 
   
    if(this.state.barcodeScanning === false){
    Vibration.vibrate();
    this.props.dispatch(updateBarcode(barcodes.data.substr(1)))
    this.props.dispatch(updateTime(date))
    this.props.dispatch(changePage("Product")) //changepage to product
    }
  };



  renderCamera = () =>
  (
    <View style={{ flex: 1 }}>
    
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}

            //Only for Android
            // onGoogleVisionBarcodesDetected={({ barcodes }) => {this.onBarCodeRead(barcodes)
            //   console.log(barcodes)
            // }}
            onBarCodeRead={this.onBarCodeRead}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        
        </View>

<SubBar/>
      
    </View>
  ); 

  render() {


  
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    const content = this.state.showGallery ? this.renderGallery() : cameraScreenContent;
    return <View style={styles.container}>
    {content}</View>;
    
 
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  noPermissions: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    padding: 10,
  },
  bottomButton: {
    flex: 0.3, 
    height: 58, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});
function mapStateToProps(state){
  return{
    upc: state.CheckBarcode.upc,
    time: state.CheckBarcode.time,
    mode: state.CheckBarcode.mode

  }
}
export default connect(mapStateToProps)(BarcodeSearch)