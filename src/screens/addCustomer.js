// AddCustomer.js

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AlertIOS,
  ScrollView
} from 'react-native';
import { addCustomer } from '../services/customerService';


export default class AddCustomer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: '',
        phoneNo: '',
        address: ''
      }
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePhoneNoChange = this.handlePhoneNoChange.bind(this);
      this.handleAddressChange = this.handleAddressChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNameChange(e) {
      this.setState({
        name: e.nativeEvent.text
      });
    }
    handlePhoneNoChange(e) {
        this.setState({
            phoneNo: e.nativeEvent.text
        });
      }
    handleAddressChange(e) {
        this.setState({
            address: e.nativeEvent.text
        });
      }
    handleSubmit() {
        addCustomer(this.state.name, this.state.phoneNo, this.state.address);
      AlertIOS.alert(
        'Customer saved successfully'
       );
    }
  render() {
    return (
        <ScrollView style={styles.scrollView}>
      <View style={styles.main}>
        <View style={styles.sub}>
            <Text style={styles.title}>Name</Text>
            <TextInput
                style={styles.itemInput}
                onChange={this.handleNameChange}
                />
            </View>

        <View style={styles.sub}>
            <Text style={styles.title}>Phone Number</Text>
            <TextInput
                  style={styles.itemInput}
                onChange={this.handlePhoneNoChange}
                />
            </View>

        <View style={styles.sub}>
            <Text style={styles.title}>Adress</Text>
            <TextInput
                  style={styles.itemInput}
                onChange={this.handleAddressChange}
                />
             </View>

        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {this.handleSubmit}
              >
              <Text
                  style={styles.buttonText}>
                  Save Customer
              </Text>
            </TouchableHighlight>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#2a8ab7'
      },
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#2a8ab7'
  },
  sub: {
    height: 100,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'center'
  },
  itemInput: {
    height: 40,
    padding: 4,
    marginRight: 5,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
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