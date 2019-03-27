/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { View, StyleSheet, AppState, Modal } from 'react-native';
import PasswordGesture from 'react-native-gesture-password'
import { Provider } from 'react-redux'
import store from './src/redux/store'

import ChitScreen from './src/components/chits'
import AddCustomerScreen from './src/components/addCustomer'
import CustomerScreen from './src/components/customers'
import AddChitScreen from './src/components/addChit'
import AddCustomerToChit from './src/components/addCustomerToChit'
import PaymentsScreen from './src/components/payments'
import ReportsScreen from './src/components/reports'

// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

// const RootStack = createStackNavigator(
//   {
//     Lock: LockScreen,
//     Login: LoginScreen,
//     Home: HomeScreen,
//     AddCustomer: AddCustomerScreen,
//     ViewCustomer: ViewCustomerScreen,
//     AddChit: AddChitScreen
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

const CustomerStack = createStackNavigator(
  {
    ViewCustomer: CustomerScreen,
    AddCustomer: AddCustomerScreen,
    Chit: ChitScreen,
    AddChit: AddChitScreen
  },
  {
    initialRouteName: 'ViewCustomer',
  }
);

const ChitStack = createStackNavigator(
  {
    Chit: ChitScreen,
    AddChit: AddChitScreen,
    ViewCustomer: CustomerScreen,
    AddCustomer: AddCustomerScreen,
    AddCustToChit: AddCustomerToChit
  },
  {
    initialRouteName: 'Chit',
  }
);

const PaymentsStack = createStackNavigator(
  {
    Payments: PaymentsScreen,
  },
  {
    initialRouteName: 'Payments',
  }
);

const ReportsStack = createStackNavigator(
  {
    Reports: ReportsScreen,
  },
  {
    initialRouteName: 'Reports',
  }
);




// const customerContainer = createAppContainer(CustomerStack);

const TabNavigator = createBottomTabNavigator({
  Chits: { screen: ChitStack },
  Customers: { screen: CustomerStack },
  Payments: {screen: PaymentsStack},
  Reports:  {screen: ReportsStack}
});

const AppContainer = createAppContainer(TabNavigator);


export default class App extends Component {

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      //this.setModalVisible(true);
    }
  }

  onStart = () => {
    this.setState({
      status: 'normal',
      message: 'Please input your password.'
    });
  }

  onEnd = (password) => {
    if (password == '123') {
      this.setState({
        status: 'right',
        message: 'Password is right, success.'
      });
      this.setModalVisible(false);

    } else {
      this.setState({
        status: 'wrong',
        message: 'Password is wrong, try again.'
      });
    }
  }

  onReset = () => {
    this.setState({
      status: 'normal',
      message: 'Please input your password.'
    });
  }

  render() {
    return (
      <Provider store={store}>

        <View style={styles.main}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{ marginTop: 22 }}>
              <View>
                <PasswordGesture
                  ref='pg'
                  status={this.state.status}
                  message={this.state.message}
                  onStart={() => this.onStart()}
                  onEnd={(password) => this.onEnd(password)}
                  onReset={() => this.onReset()}
                />
              </View>
            </View>
          </Modal>

          <AppContainer />
        </View>
      </Provider>
    )
    // return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 0,
    backgroundColor: '#2a8ab7'
  }
});