import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  StatusBar,
  View,
  Platform,
  ActivityIndicator
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import AlbumListItem from './AlbumListItem';
import Strings from '../Utilities/Strings';


export default class AlbumList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true)
    this.fetchData()
  }
  componentWillUnmount(){
    console.log('passProps Albums',this.props.passProps)
        StatusBar.setBarStyle('light-content', true)
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={ ( album ) => <AlbumListItem album={ album } /> }/>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={Strings.tintColor} size="large"/>
          <Text style={styles.welcome}>{Strings.loadingText}</Text>
      </View>
    );
  }
  
  fetchData() {
    console.log('passProps Albums',this.props.passProps)

    this.props.passProps.fetch(function(data){
      this.setState({
        albums: data,
        dataSource: this.state.dataSource.cloneWithRows(data),
        loaded: true,
      })
    }.bind(this))
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
