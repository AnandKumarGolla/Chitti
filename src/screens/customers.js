// viewCustomer.js

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'
import ItemComponent from '../components/CustomerComponent';
import Swipeout from 'react-native-swipeout';

import { db } from '../config/db';

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
            items: [],
            error: null,
        };

        this.arrayholder = [];
        this.screenFor = ""
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
            address: customerSnapshot.val().address
          })
        })
        console.log(items)

          this.setState({
              loading: false,
              items: items,
              error: error,
          });
          this.arrayholder = items;
       });
    }

    fetchAllCustomers = () => {

      let itemsRef = db.ref('/Customers');

      this.setState({ loading: true });
      itemsRef.on('value', (snapshot) => {
          // let data = snapshot.val();
          let error = snapshot.error
          // let items = Object.values(data);
          // console.log(snapshot)

          var items = [];
          snapshot.forEach((child) => {
            items.push({
              name: child.val().name,
              phoneNo: child.val().phoneNo,
              address: child.val().address,
              key: child.key
            });
          });

          this.setState({
              loading: false,
              items: items,
              error: error,
          });
          this.arrayholder = items;
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
        console.log(this.arrayholder);
        const newData = this.arrayholder.filter(item => {
          const itemData = item.name.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
            items: newData,
        });
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
          this.props.navigation.navigate('AddCustToChit', {item: this.props.navigation.state.params.item});
        } else {
          this.props.navigation.navigate('AddCustomer');
        }
      };
    
    render() {

      var swipeoutBtns = [
        {
          text: 'Delete'
        },
        {
          text: 'Call'
        }
      ]

        if (this.state.loading) {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
              </View>
            );
          }
        return (
            <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => (
                      <Swipeout right={swipeoutBtns}>

                        <ListItem
                        key={item.key}
                        title={item.name}
                        subtitle={item.address}
                        containerStyle={{borderBottomWidth: 0, borderTopWidth: 0}}
                        buttonStyle = {backgroundColor = 'orange'}
                        />
                        </Swipeout>

                    )}
                    keyExtractor={item => item.key}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    />
            </List>
        )
    }
}