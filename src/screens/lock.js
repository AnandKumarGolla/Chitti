import React, {Component} from 'react';
import PasswordGesture from 'react-native-gesture-password'

// var PasswordGesture = require('react-native-gesture-password');

export default class Lock extends Component {

    constructor(props) {
      super(props);
      this.state = {
        status: 'normal',
        message: 'Please input your password.'
      }
  
    //   this.onStart = this.onStart.bind(this);
    //   this.onEnd = this.onEnd.bind(this);
    }

    onStart = () => {
        console.log('on Start')
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
            this.props.navigation.navigate('Home');
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
        <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => 
                    {console.log("print start")
                 this.onStart()}
                }
                onEnd={(password) => this.onEnd(password)}
                onReset={() => this.onReset()}
                />
      );
    }
  }