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
    TouchableOpacity
} from 'react-native';
import { addPayment } from '../../services/payment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';

var items = [
    {
      id: 1,
      name: 'JavaScript',
    },
    {
      id: 2,
      name: 'Java',
    },
    {
      id: 3,
      name: 'Ruby',
    },
    {
      id: 4,
      name: 'React Native',
    },
    {
      id: 5,
      name: 'PHP',
    },
    {
      id: 6,
      name: 'Python',
    },
    {
      id: 7,
      name: 'Go',
    },
    {
      id: 8,
      name: 'Swift',
    },
  ];


export default class Payments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCustomer: null,
            selectedChit: null,
            chosenDate: new Date(),
            isDateTimePickerVisible: false,
        }
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({ chosenDate: date });
        this._hideDateTimePicker();
    };

    setDuration(e) {
        this.setState({
            duration: e.nativeEvent.text
        });
    }
    handleSubmit = () => {
        console.log(this.state.chosenDate)
        // addChit(this.state.name, this.state.chosenDate, this.state.duration);
        AlertIOS.alert(
            'Chit saved successfully'
        );
    }

    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.main}>

                    <View style={styles.sub}>
                        <Text style={styles.title}>Payment Date</Text>
                        <TouchableOpacity onPress={this._showDateTimePicker} style={styles.itemInput}>
                            <Text style={styles.title}>{this.state.chosenDate.toDateString()}</Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </View>

                    <View style={styles.sub}>
                        <Text style={styles.title}>Customer</Text>
                    <SearchableDropdown
                        // onTextChange={text => alert(text)}
                        // onItemSelect={item => alert(JSON.stringify(item)}
                        onItemSelect={item => this.setState({
                            selectedCustomer: item,
                        })}
                        containerStyle={{ padding: 5 }}
                        textInputStyle={styles.itemInput}
                        itemStyle={{
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: '#ddd',
                            borderColor: '#bbb',
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                        itemTextStyle={{ color: '#222' }}
                        itemsContainerStyle={{ maxHeight: 140 }}
                        items={items}
                        // defaultIndex={2}
                        placeholder="Select customer"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                    </View>

                    <View style={styles.sub}>
                        <Text style={styles.title}>Chit</Text>
                    <SearchableDropdown
                        // onTextChange={text => alert(text)}
                        // onItemSelect={item => alert(JSON.stringify(item)}
                        onItemSelect={item => this.setState({
                            selectedChit: item,
                        })}
                        containerStyle={{ padding: 5 }}
                        textInputStyle={styles.itemInput}
                        itemStyle={{
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: '#ddd',
                            borderColor: '#bbb',
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                        itemTextStyle={{ color: '#222' }}
                        itemsContainerStyle={{ maxHeight: 140 }}
                        items={items}
                        // defaultIndex={2}
                        placeholder="Select customer"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />
                    </View>

                    <View style={styles.sub}>
                        <Text style={styles.title}>Amount Paid</Text>
                        <TextInput
                            style={styles.itemInput}
                            onChange={this.setDuration}
                        />
                    </View>

                    <TouchableHighlight
                        style={styles.button}
                        underlayColor="white"
                        onPress={() => this.handleSubmit()}
                    >
                        <Text
                            style={styles.buttonText}>
                            Save Payment
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
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});