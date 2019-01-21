import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableHighlight} from 'react-native';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      userName: e.nativeEvent.text
    });
  }
  handlePasswordChange(e) {
      this.setState({
        password: e.nativeEvent.text
      });
    }

  _onPressLoginButton=() => {
    this.props.navigation.navigate('Home');
    //Alert.alert('You tapped the Login!')
  }

  render() {

    return (

      <View style={styles.main}>

        <View style={styles.sub}>
            <Text style={styles.title}>User Name</Text>
            <TextInput
                  style={styles.itemInput}
                  onChange={this.handleNameChange}
                />
            </View>

        <View style={styles.sub}>
            <Text style={styles.title}>Password</Text>
            <TextInput
                  style={styles.itemInput}
                  onChange={this.handlePasswordChange}
                />
            </View>

        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {this._onPressLoginButton}
              >
              <Text
                  style={styles.buttonText}>
                  Login
              </Text>
            </TouchableHighlight>

      </View>
      
    );
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