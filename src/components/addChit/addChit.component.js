// AddCustomer.js

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AlertIOS,
  ScrollView,
  DatePickerIOS
} from 'react-native';
import { addChit } from '../../services/chitService';


export default class AddChit extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: '',
        chosenDate: new Date(),
        duration: 20
      }

      this.setName = this.setName.bind(this);
      this.setDate = this.setDate.bind(this);
      this.setDuration = this.setDuration.bind(this);
    }
    setName(e) {
      this.setState({
        name: e.nativeEvent.text
      });
    }
    setDate(newDate) {
        this.setState({chosenDate: newDate});
      }
    setDuration(e){
        this.setState({
            duration: e.nativeEvent.text
        });
      }
    handleSubmit = () => {
        console.log(this.state.chosenDate)
        addChit(this.state.name, this.state.chosenDate, this.state.duration);
      AlertIOS.alert(
        'Chit saved successfully'
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
                onChange={this.setName}
                />
            </View>

        <Text style={styles.title}>Date</Text>
            <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />

        <View style={styles.sub}>
            <Text style={styles.title}>Duration</Text>
            <TextInput
                  style={styles.itemInput}
                onChange={this.setDuration}
                />
             </View>

        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {() => this.handleSubmit()}
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