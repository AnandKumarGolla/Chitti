// viewCustomer.js

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
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
            items: []
        }
        
    }

    componentDidMount() {
        this.setState({ loading: true });
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({
                loading: false,
                items: items
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

      renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
      };
    
    render() {
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