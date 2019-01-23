// Home.js

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class Home extends Component {

  _onPressAddCustomerButton=() => {
    this.props.navigation.navigate('AddCustomer');
    //Alert.alert('You tapped the Login!')
  }

  _onPressViewCustomerButton=() => {
    this.props.navigation.navigate('ViewCustomer');
    //Alert.alert('You tapped the Login!')
  }

  _onPressAddChitButton=() => {
    this.props.navigation.navigate('AddChit');
    //Alert.alert('You tapped the Login!')
  }

  render() {
    return (
      <View style={styles.main}>
        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {this._onPressAddCustomerButton}
              >
              <Text
                  style={styles.buttonText}>
                  Add Customer
              </Text>
            </TouchableHighlight>

        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {this._onPressViewCustomerButton}
              >
              <Text
                  style={styles.buttonText}>
                  View Customer
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {this._onPressAddChitButton}
              >
              <Text
                  style={styles.buttonText}>
                  Add Chit
              </Text>
            </TouchableHighlight>
      </View>
    )
  }
}


const styles = StyleSheet.create({
main: {
  flex: 1,
  padding: 30,
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#2a8ab7'
},
buttonText: {
  fontSize: 18,
  color: '#111',
  alignSelf: 'center'
},
button: {
  height: 45,
  flexDirection: 'row',
  backgroundColor:'white',
  borderColor: 'white',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  marginTop: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
}
});