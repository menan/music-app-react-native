import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  StatusBar,
  AsyncStorage,
  View,
  Platform
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import FavoriteListItem from './FavoriteListItem';

import Strings from '../Utilities/Strings';
import { Storage } from '../Utilities/Storage'

const storage = new Storage()

export default class FavoritsList extends React.Component {
  constructor(props){
    super(props);
    console.log('props',props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true)
    this.loadFavorites()
  }


  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{Strings.loadingText}</Text>
      </View>
    );
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }

    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={ ( album ) => <FavoriteListItem album={ album } /> }/>
      </View>
    );
  }

  async loadFavorites(){
    var albums = storage.getAllAlbums()
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(albums),
      loaded: true,
    });
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Strings.titleFont,
    margin: 10,
    color: '#000',
  },
  instructions: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
});
