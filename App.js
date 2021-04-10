import React from 'react';
import LoginScreen from './screens/LoginScreen';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {TabNavigator} from './components/AppTabNavigator';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    );
  }
}

const SwitchNavigator = createSwitchNavigator({
  LoginScreen:{screen:LoginScreen}, 
  BottomTabNavigator:{screen:TabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator);