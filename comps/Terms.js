import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, StatusBar,ScrollView,Switch } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {connect} from 'react-redux'
import firebase from './config/firebaseconfig'

import {changePage,changeNavPage,changeTheme} from '../redux/action'

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class Terms extends Component {
 

 
  handleBack=()=>{
    this.props.dispatch(changePage(3))
  }
  render() {

        return (


            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:"100%", backgroundColor:this.props.bgcol }}>
            <MyStatusBar backgroundColor="#614B8E" barStyle="light-content" />
            <View style={{ flex: 0.3, backgroundColor:this.props.bottomcol,width:"100%", }}>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:this.props.bottomcol,width:"100%", }}>
              <TouchableOpacity style={{position: "absolute", left:15}}><Icon size={50} color='white' name="chevron-left" onPress={this.handleBack}/></TouchableOpacity>
                <Text style={{ color:this.props.ptext, fontSize:24}}>TERMS OF USE</Text>
              </View>
              <View style={{ flex: 8, alignItems: 'center', justifyContent: 'space-evenly',flexDirection:"column",width:"100%", marginBottom:56}}>
                <ScrollView style={{flex:1,paddingLeft: 20, paddingRight:20,  backgroundColor:this.props.bgcol}}>
        <Text style={{textAlign:"justify", color:this.props.stext}}>
        These terms and conditions are an agreement between the Preview team and the user. This agreement sets forth the general terms and conditions of your use of the Previews mobile application and any of its services.
        </Text>
        <Text style={{margin:10,fontWeight:"bold", color:this.props.ttext, fontSize:18}}>Accounts and membership</Text> 
        <Text style={{textAlign:"justify", color:this.props.stext}}>
        If you create an account in Previews, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.
        </Text>

        <Text style={{margin:10,fontWeight:"bold", color:this.props.ttext, fontSize:18}}>User content</Text> 
        <Text style={{textAlign:"justify", color:this.props.stext}}>
        We do not own any data, information or content that you submit in Previews in the course of using the Service. You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted content. We may, but have no obligation to, monitor content in Previews submitted or created using our Services by you. Unless specifically permitted by you, your use of Previews does not grant us the license to use, reproduce, adapt, modify, publish or distribute the content created by you or stored in your user account for commercial, marketing or any similar purpose. But you grant us permission to access, copy, distribute, store, transmit, reformat, display and perform the content of your user account solely as required for the purpose of providing the Services to you. Without limiting any of those representations or warranties, we have the right, though not the obligation, to, in our own sole discretion, refuse or remove any content that, in our reasonable opinion, violates any of our policies or is in any way harmful or objectionable.
        </Text>

        <Text style={{margin:10,fontWeight:"bold", color:this.props.ttext, fontSize:18}}>Backups</Text> 
        <Text style={{textAlign:"justify", color:this.props.stext}}>
        We perform regular backups of the content and will do our best to ensure completeness and accuracy of these backups. In the event of the hardware failure or data loss we will restore backups automatically to minimize the impact and downtime.
        </Text>
          
        <Text style={{margin:10,fontWeight:"bold", color:this.props.ttext, fontSize:18}}>Links to other mobile applications</Text> 
        <Text style={{textAlign:"justify", color:this.props.stext}}>
        Although Previews may be linked to other mobile applications, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked mobile application, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their mobile applications. We do not assume any responsibility or liability for the actions, products, services, and content of any other third-parties. You should carefully review the legal statements and other conditions of use of any mobile application which you access through a link from Previews. Your linking to any other off-site mobile applications is at your own risk.
        </Text>

        <Text style={{margin:10,fontWeight:"bold", color:this.props.ttext, fontSize:18}}>Prohibited uses</Text> 
        <Text style={{textAlign:"justify", color:this.props.stext}}>
        In addition to other terms as set forth in the agreement, you are prohibited from using Previews or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related mobile application, other mobile applications, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related mobile application, other mobile applications, or the Internet. We reserve the right to terminate your use of the Service or any related mobile application for violating any of the prohibited uses.
        </Text>

        <Text style={{margin:10,fontWeight:"bold", color:this.props.ttext, fontSize:18}}>Intellectual property rights</Text> 
        <Text style={{textAlign:"justify", color:this.props.stext}}>
        This agreement does not transfer to you any intellectual property owned by Previews or third-parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with Previews. All trademarks, service marks, graphics and logos used in connection with Previews and it's services, are trademarks or registered trademarks of Previews or Previews licensors. Other trademarks, service marks, graphics and logos used in connection with Previews and it's services may be the trademarks of other third-parties. Your use of Previews grants you no right or license to reproduce or otherwise use any Previews or third-party trademarks.
        </Text>

        <Text style={{margin:10,fontWeight:"bold", color:this.props.ttext, fontSize:18}}>Changes and amendments</Text> 
        <Text style={{textAlign:"justify", color:this.props.stext}}>
        We reserve the right to modify this agreement or its policies relating to Previews at any time, effective upon posting of an updated version of this agreement in the application. When we do, we will revise the updated date at the bottom of this page. Continued use of Previews after any such changes shall constitute your consent to such changes.
        </Text>

        <Text style={{margin:10,fontWeight:"bold", color:this.props.ttext, fontSize:18}}>Acceptance of these terms</Text> 
        <Text style={{textAlign:"justify", color:this.props.stext}}>
        You acknowledge that you have read this agreement and agree to all its terms and conditions. By using Previews or its Services you agree to be bound by this agreement. If you do not agree to abide by the terms of this agreement, you are not authorized to use or access Previews and its Services.
        </Text>
        
        <Text style={{margin:10,fontWeight:"bold", color:this.props.ttext, fontSize:18}}>Contacting us</Text> 
        <Text style={{textAlign:"justify", color:this.props.stext}}>
        If you have any questions about this agreement, please contact us.

        This document was last updated on November 16, 2018
        </Text>
        </ScrollView> 
              </View>
            </View>
    
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff8f7',
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});

function mapStateToProps(state){
  return{
    bgcol:state.CheckBarcode.bgcol,
    navcol:state.CheckBarcode.navcol,
    tabcol:state.CheckBarcode.tabcol,
    ptext:state.CheckBarcode.ptext,
    ttext:state.CheckBarcode.ttext,
    stext:state.CheckBarcode.stext,
		bottomcol:state.CheckBarcode.bottomcol,
	
	
  }
}
export default connect(mapStateToProps)(Terms)