// viewCustomer.js

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight, Button} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';

import { db } from '../config/db';

let itemsRef = db.ref('/Chit');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#B6A6BB',
    },
    button: {
      height: 45,
      width: 100
    }
  })

export default class Chits extends Component {

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

      this.props.navigation.setParams({ addButtonClicked: this._addButtonClicked });

        this.setState({ loading: true });
        itemsRef.on('value', (snapshot) => {
            // let data = snapshot.val();
            let error = snapshot.error
            // let items = Object.values(data);
            var items = [];
            snapshot.forEach((child) => {
              items.push({
                name: child.val().name,
                startDate: child.val().startDate,
                duration: child.val().duration,
                _key: child.key
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

    configureScene() {
      return ExNavigator.SceneConfigs.FloatFromRight;
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
            placeholder="Search Chit name..."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
          />
        );
      };

      static navigationOptions = ({ navigation }) => {
        return {
          title: 'Chits',
          headerRight: (
            <Button
              title='Add'
              onPress={navigation.getParam('addButtonClicked')}
              />
          ),
        };
      };

      _addButtonClicked = () => {
        this.props.navigation.navigate('AddChit');
      };

      onPressListItem = (item) => {
        console.log('Item clicked')
        this.props.navigation.navigate('ViewCustomer', {item:item});
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
        return (
            <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => (
                      <Swipeout right={swipeoutBtns}>

                        <ListItem
                        title={item.name}
                        subtitle={item.duration}
                        containerStyle={{borderBottomWidth: 0, borderTopWidth: 0}}
                        onPress={()=> { this.onPressListItem(item)}}
                        />
                        </Swipeout>

                    )}
                    keyExtractor={item => item._key}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    />
            </List>
        )
    }
}