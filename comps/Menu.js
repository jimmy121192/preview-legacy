import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet,Text, StatusBar,TouchableOpacity} from 'react-native'
import BarcodeSearch from './BarcodeSearch'
import BottomBar from './BottomBar';
import Keyword from './Keyword';
import Reviews from './Reviews';
import Settings from './Settings'
import Search from './Search'
import Profile from './Profile';
import AddProduct from './AddProduct';
import AddReview from './AddReview';
import MyCameraRoll from './MyCameraRoll';
import Google from './Google';
import Amazon from './Amazon';
import Avatar from './Avatar';
import Camera from './Camera';
import Terms from './Terms';
import Credits from './Credits';
//Redux

import {connect} from 'react-redux'
import Product from './Product';





const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
class BarcodeScan extends React.Component {
  
    static navigationOptions = {
      tabBarLabel: 'BarcodeScan',
      tabBarIcon: () => (<Icon size={24} color="white" name="barcode-scan" />)
    }
    

    render() {
      
      return (
        
        <View style={{flex:1, width:'100%', justifyContent:"center"}}> 
        <BarcodeSearch/>        
        </View>       
      );
    }
  } 

class ProductLookUp extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'ProductLookUp',
    tabBarIcon: () => (<Icon size={24} color="white" name="search-web" />)
  }

  render() {
    return (
      <Keyword/>
    );
   }
}


class MyProfile extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'History',
    tabBarIcon: () => (<Icon size={24} color="white" name="history" />)
  }

  render() {
    return (
      <Profile/>
    );
   }
}

class MySettings extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: () => (<Icon size={24} color="white" name="settings" />)
  }

  render() {

    return (
      <Settings/>
 

    );
   }
}





class Menu extends Component {


  render() {

    if(this.props.page === 0){  
      return (
        <View style={styles.container}>
        <BarcodeScan/>
        <BottomBar/>
        </View>
  
      )
}
    if(this.props.page === 1){   
  
      return (
        <View style={styles.container}>
        <ProductLookUp/>
        <BottomBar/>

        
        </View>
  
      )
}
    if(this.props.page === 2){   
      return (
        <View style={styles.container}>
        <MyProfile/>
        <BottomBar/>

        
        </View>
  
      )
}
    if(this.props.page === 3){   
      return (
        <View style={styles.container}>
        <MySettings/>
        <BottomBar/>         
        </View>
      )
    }

    if(this.props.page === "Product"){   
      return (
        <View style={styles.container}>
        <Product/>
        <BottomBar/>         
        </View>
      )
    }

    if(this.props.page === "Reviews"){   
      return (
        <View style={styles.container}>
        <Reviews/>
        <BottomBar/>         
        </View>
      )
    }

    if(this.props.page === "Search"){   
      return (
        <View style={styles.container}>
        <Search/>
        <BottomBar/>         
        </View>
      )
    }

    if(this.props.page === "AddProduct"){   
      return (
        <View style={styles.container}>
        <AddProduct/>
        <BottomBar/>         
        </View>
      )
    }

    if(this.props.page === "AddReview"){   
      return (
        <View style={styles.container}>
        <AddReview/>
        <BottomBar/>         
        </View>
      )
    }

    if(this.props.page === "MyCameraRoll"){   
      return (
        <View style={styles.container}>
        <MyCameraRoll/>
        <BottomBar/>         
        </View>
      )
    }
    if(this.props.page === "Google"){   
      return (
        <View style={styles.container}>
        <Google/> 
        <BottomBar/>          
        </View>
      )
    }
    if(this.props.page === "Amazon"){   
      return (
        <View style={styles.container}>
        <Amazon/> 
        <BottomBar/>          
        </View>
      )
    }

    if(this.props.page === "Avatar"){   
      return (
        <View style={styles.container}>
        <Avatar/> 
        <BottomBar/>          
        </View>
      )
    }

    if(this.props.page === "Camera"){   
      return (
        <View style={styles.container}>
        <Camera/> 
        <BottomBar/>          
        </View>
      )
    }
			
		if(this.props.page === "Terms"){   
      return (
        <View style={styles.container}>
        <Terms/> 
        <BottomBar/>          
        </View>
      )
    }
			
			if(this.props.page === "Credits"){   
      return (
        <View style={styles.container}>
        <Credits/> 
        <BottomBar/>          
        </View>
      )
    }
			

  }
}
const styles = StyleSheet.create({
  container: {
    // fontFamily: 'futura',
    width:'100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

  },
});

function mapStateToProps(state){
  return{
    page: state.CheckBarcode.page,

 
  }
}

export default connect(mapStateToProps)(Menu)