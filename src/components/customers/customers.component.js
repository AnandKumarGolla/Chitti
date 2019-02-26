// viewCustomer.js

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import {removeCustomerFromChit} from '../../services/chitService'
import { updateAllCustomerList } from './customers.actions'


import { db } from '../../config/db';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#B6A6BB',
  }
})

export default class ViewCustomer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      customerList: [],
      error: null,
    };

    this.screenFor = ""
    this.arrayholder = []

  }

  componentDidMount() {

    this.props.navigation.setParams({ addButtonClicked: this._addButtonClicked });

    if (this.props.navigation.state.params) {
      this.screenFor = "CustomersOfChit"
      this.fetchAllCustomersOfChit(this.props.navigation.state.params.item)
    } else {
      this.screenFor = "AllCustomers"
      this.fetchAllCustomers()
    }
  }

  fetchAllCustomersOfChit = (item) => {

    this.setState({ loading: true });

    let itemsRef = db.ref('/Chit/' + item.key + "/customers");
    var items = [];
    itemsRef.on('child_added', (snapshot) => {
      let error = snapshot.error
      let customerRef = db.ref('Customers/' + snapshot.key);
      customerRef.once('value').then((customerSnapshot) => {
        items.push({
          name: customerSnapshot.val().name,
          phoneNo: customerSnapshot.val().phoneNo,
          address: customerSnapshot.val().address,
          key: customerSnapshot.key
        })
      })

      this.setState({
        loading: false,
        customerList: items,
        error: error,
      });
      this.arrayholder = items;
    });
  }

  fetchAllCustomers = () => {

    let itemsRef = db.ref('/Customers');

    this.setState({ loading: true });
    itemsRef.on('value', (snapshot) => {
      let error = snapshot.error

      var items = [];
      snapshot.forEach((child) => {
        items.push({
          name: child.val().name,
          phoneNo: child.val().phoneNo,
          address: child.val().address,
          key: child.key
        });
      });

      this.props.updateAllCustomerList(items)
      this.setState({
        loading: false,
        customerList: items,
        error: error,
      });
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "95%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%"
        }}
      />
    );
  };

  searchFilterFunction = text => {
    var customersList = this.screenFor == "AllCustomers" ? this.props.allCustomerList : this.arrayholder
    const newData = customersList.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      customerList: newData
    })
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search Customer name..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Customers',
      headerRight: (
        <Button
          title='Add'
          onPress={navigation.getParam('addButtonClicked')}
        />
      ),
    };
  };

  _addButtonClicked = () => {
    if (this.screenFor == "CustomersOfChit") {
      this.props.navigation.navigate('AddCustToChit', { item: this.props.navigation.state.params.item });
    } else {
      this.props.navigation.navigate('AddCustomer');
    }
  };

  removeCustomer = (item) => {
    if (this.screenFor == "AllCustomers") {
      db.ref('/Customers').child(item.key).remove();
    } else {
      removeCustomerFromChit(this.props.navigation.state.params.item.key, item.key)

      var items = this.state.customerList
      var index = items.indexOf(item);

      items.splice(index, 1)
      this.setState({
        items: items
      })
      this.arrayholder.pop(item)
    }
  }

  renderRow(rowData) {
    var swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => {
          this.removeCustomer(rowData)
        }
      },
      {
        text: 'Call'
      }
    ]

    return (
      <Swipeout right={swipeoutBtns}
        autoClose='true'
        backgroundColor= 'transparent'>
        <ListItem
                key={rowData.key}
                title={rowData.name}
                subtitle={rowData.address}
                containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}
              />
      </Swipeout>
    )
  }

  render() {

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.customerList}
          renderItem={({ item }) => (this.renderRow(item))} 
          keyExtractor={item => item.key}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
    )
  }
}