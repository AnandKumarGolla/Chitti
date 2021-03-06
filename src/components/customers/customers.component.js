// viewCustomer.js

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import { List, ListItem, SearchBar, colors } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import { removeCustomerFromChit } from '../../services/chitService'
import { removeChitFromCustomer} from '../../services/customerService'
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
    this.addCustomerRef = null
    this.removeCustomerRef = null
    this.itemsRef = null
  }

  componentDidMount() {

    this.props.navigation.setParams({ addButtonClicked: this._addButtonClicked });

  }

  componentWillUnmount() {
    if (this.screenFor = "CustomersOfChit") {
      this.itemsRef.off('child_added');
      this.itemsRef.off('child_removed');
    } else {
      this.itemsRef.off('value')
    }
  }


  fetchAllCustomersOfChit = (item) => {

    this.itemsRef = db.ref('/Chit/' + item.key + "/customers");
    var items = [];
    this.itemsRef.on('child_added', async (snapshot) => {
      this.setState({ loading: true });
      let error = snapshot.error

      let customerRef = db.ref('Customers/' + snapshot.key);
      let customerSnapshot = await customerRef.once('value')
        items.push({
          name: customerSnapshot.val().name,
          phoneNo: customerSnapshot.val().phoneNo,
          address: customerSnapshot.val().address,
          key: customerSnapshot.key
        })
      this.setState({
        loading: false,
        customerList: items,
        error: error,
      });
      this.arrayholder = items;
    });

    this.itemsRef.on('child_removed', (snapshot) => {
      let error = snapshot.error

      let filteredCustomers = this.arrayholder.filter(item => {
        return item.key != snapshot.key;
      })
      this.setState({
        loading: false,
        customerList: filteredCustomers,
        error: error,
      });
      this.arrayholder = filteredCustomers;
    })
  }

  fetchAllCustomers = () => {

    this.itemsRef = db.ref('/Customers');

    this.setState({ loading: true });
    this.itemsRef.on('value', (snapshot) => {
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

  renderNoRecords = () => {
    return (
      <Text style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        No Records Found
      </Text>
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
      // ToDo: Handle transactions
      removeCustomerFromChit(this.props.navigation.state.params.item.key, item.key)
      removeChitFromCustomer(this.props.navigation.state.params.item.key, item.key)
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
        text: 'Call',
        backgroundColor: 'blue',

      }
    ]

    return (
      <Swipeout right={swipeoutBtns}
        autoClose='true'
        backgroundColor='transparent'>
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
    console.log(this.state.customerList)
    return (
      // <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <FlatList
        ListEmptyComponent={this.renderNoRecords}
        // legacyImplementation = {true}
        data={this.state.customerList}
        renderItem={({ item }) => (this.renderRow(item))}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
      />
      // </List>
    )
  }
}