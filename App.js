/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import LockScreen from './src/screens/lock'
import LoginScreen from './src/screens/login'
import HomeScreen from './src/screens/home'
import AddCustomerScreen from './src/screens/addCustomer'
import ViewCustomerScreen from './src/screens/viewCustomer'

const RootStack = createStackNavigator(
  {
    Lock: LockScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    AddCustomer: AddCustomerScreen,
    ViewCustomer: ViewCustomerScreen
  },
  {
    initialRouteName: 'Lock',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}