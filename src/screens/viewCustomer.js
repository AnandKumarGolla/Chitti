// viewCustomer.js

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'
import ItemComponent from '../components/CustomerComponent';

import { db } from '../config/db';

let itemsRef = db.ref('/Customers');

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
    }

    componentDidMount() {
        this.setState({ loading: true });
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let error = snapshot.error
            let items = Object.values(data);
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
    
    render() {
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
                        <ListItem
                        title={item.name}
                        subtitle={item.address}
                        containerStyle={{borderBottomWidth: 0, borderTopWidth: 0}}
                        />
                    )}
                    keyExtractor={item => item.name}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    />
            </List>
        )
    }
}