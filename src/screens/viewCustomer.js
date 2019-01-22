// viewCustomer.js

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import { List, ListItem } from 'react-native-elements'
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
    
    render() {
        return (
            <List>
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => (
                        <ListItem
                        roundAvatar
                        title={item.name}
                        subtitle={item.address}
                        />
                    )}
                />
            </List>
        )
    }
}