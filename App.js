import React, { Component } from 'react'
import { View, StyleSheet} from 'react-native'
import Form from './comps/Form'
import thunkMiddleware from 'redux-thunk' 
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from './redux/combine'
import GlobalFont from 'react-native-global-font';
import SplashScreen from 'react-native-splash-screen'



const store = createStore(
  reducers,
  applyMiddleware(
      thunkMiddleware
  )
)

export default class App extends Component {

componentDidMount= async()=> {

  let fontName = "Futura"
  GlobalFont.applyGlobal(fontName)
  SplashScreen.hide();

			
}



  render() {
		
    return (
      <Provider store={store}>
      <Form/>
    </Provider>)
  }
}
