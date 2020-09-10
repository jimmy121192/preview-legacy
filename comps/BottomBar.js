import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import BottomNavigation, {Tab} from 'react-native-material-bottom-navigation-performance'
import {connect} from 'react-redux'
import {changePage,newProdImg,newProduct} from '../redux/action'

class BottomBar extends Component {
  constructor() {
    super();
    this.state = {
        page: 0,
      };

      this.handleClick = this.handleClick.bind(this);
  }

  handleClick=(newTabIndex) => {
 
    
    if(newTabIndex === this.props.page){
      return
    } 
    else {
    this.setState({page:newTabIndex})
    this.props.dispatch(newProdImg(''))  //reset image
    this.props.dispatch(newProduct('','','','')) //reset product info
    this.props.dispatch(changePage(newTabIndex))
    
    }
  }

  componentDidMount(){
    if(this.props.page !== this.state.page ){
      this.setState({page:this.props.page})
     }
  }
  render() {
   
    
    return (
      
       <BottomNavigation
      labelColor="white"
      rippleColor="white"
      style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0, backgroundColor:this.props.bottomcol }}
      onTabChange={this.handleClick}
      activeTab={this.state.page}
    >
      <Tab
        barBackgroundColor={'"'+this.props.bottomcol+'"'}
        label="Barcode Search"
        icon={<Icon size={24} color="white" name="barcode-scan" />}
      />
      <Tab
        barBackgroundColor={'"'+this.props.bottomcol+'"'}
        label="Keyword Search"
        icon={<Icon size={24} color="white" name="search-web" />}
      />
      <Tab
        barBackgroundColor={'"'+this.props.bottomcol+'"'}
        label="Profile"
        icon={<Icon2 size={24} color="white" name="user" />}
      />
      <Tab
        barBackgroundColor={'"'+this.props.bottomcol+'"'}
        label="Settings"
        icon={<Icon size={24} color="white" name="settings" />}
      />
    </BottomNavigation>

    
    
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff8f7',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function mapStateToProps(state){
  return{

    page: state.CheckBarcode.page,
		bottomcol:state.CheckBarcode.bottomcol
  }
}

export default connect(mapStateToProps)(BottomBar)