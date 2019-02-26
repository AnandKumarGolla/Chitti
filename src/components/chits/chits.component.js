
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight, Button} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import {updateFilteredChitList, updateAllChitList} from './chits.actions'

import { db } from '../../config/db';

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
            error: null,
        };
    }

    componentDidMount() {

      this.props.navigation.setParams({ addButtonClicked: this._addButtonClicked });

        this.setState({ loading: true });
        itemsRef.on('value', (snapshot) => {
            let error = snapshot.error
            var items = [];
            snapshot.forEach((child) => {
              items.push({
                name: child.val().name,
                startDate: child.val().startDate,
                duration: child.val().duration,
                key: child.key
              });
            });

            this.props.updateFilteredChitList(items)
            this.props.updateAllChitList(items)
            this.setState({
                loading: false,
                error: error,
            });
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

      renderHeader = () => {
        return (
          <SearchBar
            placeholder="Search Chit name..."
            lightTheme
            round
            onChangeText={text => this.props.searchFilterFunction(text, this.props.allChitList)}
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
                    data={this.props.filteredChitList}
                    renderItem={({ item }) => (
                      <Swipeout right={swipeoutBtns}>

                        <ListItem
                        key={item.key}
                        title={item.name}
                        subtitle={item.duration}
                        containerStyle={{borderBottomWidth: 0, borderTopWidth: 0}}
                        onPress={()=> { this.onPressListItem(item)}}
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