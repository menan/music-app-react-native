
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Platform
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';

import {Actions, ActionConst, Scene, Router, Modal, Reducer} from 'react-native-router-flux';

import AlbumList from './AlbumList';
import Album from './Album';
import Player from './Player';
import FavoriteList from './FavoriteList';
import Settings from './Settings';
import Search from './Search';

import { FileSystem } from '../Utilities/FileSystem';
import Strings from '../Utilities/Strings';
import {AlbumService} from '../Utilities/AlbumService';
import {AudioPlayer} from '../Utilities/AudioPlayer';

import Sound from 'react-native-sound';

const sound = new Sound('')
const albumService = new AlbumService()
const audioPlayer = new AudioPlayer()

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page:'second',
      albums: [],
      userIcon: null
    };
  }

  reducerCreate(params){
      const defaultReducer = Reducer(params);
      return (state, action)=>{
          console.log("ACTION:", action);
          return defaultReducer(state, action);
      }
  };


  componentDidMount(){
    new FileSystem().downloadAllSongs()
  }
  getAlbums(){
    this.state.albums
  }
  render() {
    var self = this;
    let icon = null

    console.log('from here albums', this.state.albums)

    return (
      <Router createReducer={this.reducerCreate}>
        <Scene key="modal" component={Modal}>
          <Scene key="tabbar" tabs={true}  hideNavBar={true}>
            <Scene key="tab1"  title={Strings.ta.favoriteTitle} initial>
                <Scene key="favorites" component={FavoriteList} title={Strings.ta.favoriteTitle} titleStyle={styles.navBar}/>
                <Scene key="favoriteShow" component={Album}  hideNavBar hideTabBar/>
            </Scene>
            <Scene key="tab2" title={Strings.ta.albumsTitle}>
              <Scene key="albums" component={AlbumList} title={Strings.ta.albumsTitle} titleStyle={styles.navBar} passProps={albumService} leftButtonImage={require('../assets/images/search.png')} onLeft={() => Actions.search({albums: this.state.albums})}/>
              <Scene key="albumShow" hideNavBar component={Album} hideTabBar/>
            </Scene>
            <Scene key="tab3" component={Settings}  hideNavBar={false} title={Strings.ta.settingsTitle} titleStyle={styles.navBar}/>
          </Scene>
          <Scene key="player" component={Player} title="Player"  schema="modal" hideNavBar passProps={audioPlayer}/>
          <Scene key="search" direction="vertical" passProps={albumService} component={Search} title="Search" panHandlers={null}  schema="modal" hideTabBar hideNavBar hideBackImage leftTitle="Cancel" onLeft={() => Actions.pop()}/>
        </Scene>
      </Router>
    );
  }
}


export class TabIcon extends React.Component {
    render(){
      let prefix =  (Platform.OS == 'android') ? 'md' : 'ios'
      var icon = 'heart'

      switch(this.props.title) {
          case Strings.ta.albumsTitle:
              icon = 'albums'
              break;
          case Strings.ta.settingsTitle:
              icon = 'cog'
              break;
          case 'Player':
              icon = 'disc'
              break;
          default:
              icon = 'heart'
      }

      
      return (
          <Icon name={`${prefix}-${icon}`} size={30} color={this.props.selected ? Strings.tintColor : '#000'} />
      );
    }
}
const styles = StyleSheet.create({
  application: {

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabBar: {
      backgroundColor: '#F7F8F5',
      borderTopWidth: 0.5, // Cannot be decimal fraction
      borderTopColor: '#B2B2B2',
  },
  navBar: {
    fontFamily: Strings.titleFont,
    fontSize: 20,
  },
});