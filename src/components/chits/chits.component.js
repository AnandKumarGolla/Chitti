
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight, Button } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import { updateAllChitList } from './chits.actions'

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
      chitList: [],
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

      this.props.updateAllChitList(items)
      this.setState({
        loading: false,
        chitList: items,
        error: error,
      });
    });
  }

  componentWillUnmount() {
    itemsRef.off('value')
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
    const newData = this.props.allChitList.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      chitList: newData
    })
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
    this.props.navigation.navigate('ViewCustomer', { item: item });
  }

  removeChit = (item) => {
    // if (this.screenFor == "AllCustomers") {
    //   db.ref('/Customers').child(item.key).remove();
    // } else {
    //   removeCustomerFromChit(this.props.navigation.state.params.item.key, item.key)

    //   var items = this.state.items
    //   var index = items.indexOf(item);

    //   items.splice(index, 1)
    //   this.setState({
    //     items: items
    //   })
    //   this.arrayholder.pop(item)
    // }
  }

  renderRow(item) {
    var swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => {
          this.removeChit(item)
        }
      }
    ]

    return (
      <Swipeout right={swipeoutBtns}
        autoClose='true'
        backgroundColor='transparent'>
        <ListItem
          key={item.key}
          title={item.name}
          subtitle={item.duration}
          containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}
          onPress={() => { this.onPressListItem(item) }}
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
      // <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <FlatList
        data={this.state.chitList}
        renderItem={({ item }) => (this.renderRow(item))}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
      />
      // </List>
    )
  }
}