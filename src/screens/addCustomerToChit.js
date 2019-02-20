// AddCustomerToChit.js

import React, { Component } from 'react';
import { View, Image, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';

import { db } from '../config/db';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#B6A6BB',
    },
    checkImage: {
        width: 30,
        height: 30
    }
})

export default class AddCustomerToChit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            items: [],
            error: null,
        };

        this.customersOfChit = [];
        this.arrayholder = [];
        this.screenFor = ""
    }

    componentDidMount() {

        this.props.navigation.setParams({ saveButtonClicked: this._saveClicked });

        this.fetchAllCustomersOfChit(this.props.navigation.state.params.item)
        this.fetchAllCustomers()
    }

    fetchAllCustomersOfChit = (item) => {

        this.setState({ loading: true });

        let itemsRef = db.ref('/Chit/' + item.key + "/customers");
        var items = [];
        itemsRef.on('child_added', (snapshot) => {
            let error = snapshot.error
            items.push(
                snapshot.key
            )
            this.setState({
                loading: false,
                error: error,
            });
            this.customersOfChit = items;
        });
    }

    fetchAllCustomers = () => {

        let itemsRef = db.ref('/Customers');

        this.setState({ loading: true });
        itemsRef.on('value', (snapshot) => {
            let error = snapshot.error
            var items = [];
            snapshot.forEach((child) => {
                if (!this.customersOfChit.includes(child.key)) {
                    items.push({
                        name: child.val().name,
                        phoneNo: child.val().phoneNo,
                        address: child.val().address,
                        key: child.key,
                        isSelected: false
                    });
                }
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
                    title='Save'
                    onPress={navigation.getParam('saveButtonClicked')}
                />
            ),
        };
    };

    _saveClicked = () => {

    };

    onPressListItem = (item) => {
        item.isSelected = !item.isSelected
        var itemIndex = this.state.items.indexOf(item)
        var allItems = this.state.items
        allItems[itemIndex] = item

        this.setState({
            items: allItems,
        });
    }

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

        console.log("rendering data")
        console.log(this.state.items)
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    legacyImplementation = {true}
                    data={this.state.items}
                    renderItem={({ item }) => (
                        <Swipeout right={swipeoutBtns}>
                            <ListItem
                                key={item.key}
                                title={item.name}
                                subtitle={item.address}
                                containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}
                                buttonStyle={backgroundColor = 'orange'}
                                rightIcon={
                                    item.isSelected ?
                                        <Image source={require('../resources/check.png')} style={styles.checkImage} />
                                        : <Image />
                                }
                                onPress={() => { this.onPressListItem(item) }}
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