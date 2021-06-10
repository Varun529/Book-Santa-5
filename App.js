import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from './screens/login';
import AppDrawerNavigator from './components/AppDrawerNavigator'
  export default class App extends React.Component {
    render(){
    return (
      <AppContainer/>
    );
  }
}
  
  
  const switchNavigator = createSwitchNavigator({
    LoginScreen:{screen: LoginScreen},
    Drawer:{screen: AppDrawerNavigator}
  })
  
  const AppContainer =  createAppContainer(switchNavigator);
