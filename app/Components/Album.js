import React, { Component } from 'react';

import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
  StatusBar,
  Text,
  View,
  ListView,
  Platform
} from 'react-native';

import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import Strings from '../Utilities/Strings';
import {saveSong, removeSong} from '../Utilities/Storage';
import {uni2cript} from '../Utilities/uni2cript';

import LikeButton from './LikeButton';

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? 50 : 50;
const AVATAR_SIZE = 120;

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
})

export default class Album extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dataSource: dataSource,
      songs: [],
      loaded: false,
    };
  }

  renderStickyHeader() {
    return(
      <View style={ styles.stickySection }>
        <Text style={ styles.stickySectionTitle }>{ this.props.album.name }</Text>
      </View>
    );
  }


  componentDidMount() {
    StatusBar.setBarStyle('light-content', true)
    if (this.props.album.songs !== undefined && this.props.album.songs.length > 0){
        this.setState({
          songs: this.props.album.songs,
          dataSource: dataSource.cloneWithRows(this.props.album.songs),
          loaded: true,
        });
      return
    }
    this.fetchAlbum(this.props.album.id)
    console.log('component did mount')
  }

  componentWillUnmount(){
    StatusBar.setBarStyle('dark-content', true)
  }


  fetchAlbum = function(albumId) {
    const url = Strings.apiUrl + Strings.albumPath + albumId
    console.log('fetching from ', url)
    fetch(url)
      .then((response) => response.json())
      .then((songs) => {
        newSongs = this.updateSongs(songs, albumId)
      })
      .done()
  }

  async updateSongs(songs, albumId) {

    const value = await AsyncStorage.getItem(Strings.storageKey)

    try {
        const value = await AsyncStorage.getItem(Strings.storageKey)
        if (value === null || value.length == 0){
          this.setState({
            songs: songs,
            dataSource: dataSource.cloneWithRows(songs),
            loaded: true,
          });
          return;
        }
        var localSongIds = []
        albums = JSON.parse(value);
        albums.forEach(function(localAlbum) {
            if (localAlbum.id == albumId){
                if(localAlbum.songs === null || localAlbum.songs.length == 0) return
                localAlbum.songs.forEach(function(localSong) {
                    localSongIds.push(localSong.id)
                })
            }
        })

        songs.forEach(function(song) {
            if(localSongIds.indexOf(song.id) > 0){
                song.liked = true
            }
        })
        this.setState({
          songs: songs,
          dataSource: dataSource.cloneWithRows(songs),
          loaded: true,
        });


    } catch (error) {
        // Error retrieving data
        console.log('error', error)
        return null
    }
  }

  showPlayer(rowId){
    console.log('rowId',rowId)
    Actions.player({ songIndex: parseInt( rowId ), songs: this.state.songs, album: this.props.album })
  }

  
  renderForeground() {
    return(
      <View key="parallax-header" style={ styles.parallaxHeader }>
        <Image style={ styles.avatar } source={{
          uri:  this.props.album.art_url,
          width: AVATAR_SIZE,
          height: AVATAR_SIZE
        }}/>
        <Text style={ styles.artistName }>
          { this.props.album.title }
        </Text>
        <Text style={ styles.subTitle }>
          { this.props.album.singers }
        </Text>
        <Text style={ styles.subTitle }>
          { this.props.album.music }
        </Text>
        <Text style={ styles.subTitle }>
          { this.props.album.copyright }
        </Text>
        <View style={ styles.playButton }>
          <Text
            onPress={this.showPlayer.bind(this, 0)} 
            style={ styles.playButtonText }>
            PLAY
          </Text>
        </View>
      </View>
    );
  }


  renderBackground() {
    return(
      <View key="background" style={ styles.background }>
        <Image source={{uri: this.props.album.art_url,
                        width: window.width,
                        height: PARALLAX_HEADER_HEIGHT}}/>
        <View style={ styles.backgroundOverlay }/>
      </View>
    );
  }

  renderSongsList() {
    return(
      <ListView
        dataSource={ this.state.dataSource }
        style={ styles.songsList }
        renderRow={(song, sectionId, rowId) => (
          <TouchableOpacity onPress={this.showPlayer.bind(this, rowId)} activeOpacity={ 100 } underlayColor="rgba(246, 41, 118, 0.6)">
            <View key={song} style={ styles.song }>
              <Text style={ styles.songTitle }>
                { song.title }
              </Text>
                <LikeButton song={song} album={this.props.album} />
            </View>
          </TouchableOpacity>
          )}/>
    );
  }
  
  render() {
    const { onScroll = () => {} } = this.props;
    return (
      <View style={ styles.background }>
        <ParallaxScrollView
          style={ { position: "absolute", top: 0, bottom: 0, left: 0, right: 0, width: window.width, height: window.height } }
          parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
          stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
          onScroll={onScroll}
          renderStickyHeader={ this.renderStickyHeader.bind(this) }
          renderForeground={ this.renderForeground.bind(this) }
          renderBackground={ this.renderBackground.bind(this) }>
          { this.renderSongsList() }
        </ParallaxScrollView>
        <View style={ styles.headerClose }>
          <Icon style={ styles.backIcon } onPress={ Actions.pop } name={(Platform.OS === 'ios') ? "ios-arrow-back" :  "md-arrow-back"}/>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#000",
    height: window.height
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    width: window.width,
    backgroundColor: 'rgba(0,0,0,.8)',
    height: PARALLAX_HEADER_HEIGHT
  },
  headerClose: {
    position: 'absolute',
    top: 5,
    left: 0,
    paddingTop: (Platform.OS === 'ios') ? 25 : 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  likeIcon: {
    position: 'absolute',
    paddingTop: 15,
    paddingRight: 20,
    top: 10,
    right: 0,
  },
  backIcon: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 30,
    width: 100,
    height:100,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    backgroundColor: '#000',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickySectionTitle: {
    color: "#FFF",
  },
  parallaxHeader: {
    alignItems: 'center',
    paddingTop: 40,
    width: window.width,
  },
  artistName: {
    alignItems: 'center',
    fontSize: 23,
    color: "#FFF",
    fontFamily: Strings.titleFont,
  },
  subTitle: {
    marginTop: 5,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
    fontFamily: Strings.titleFont,
  },
  avatar: {
    marginBottom: 12,
    borderRadius: 2
  },
  playButton: {
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 70,
    paddingRight: 70,
    backgroundColor: Strings.tintColor,
    borderRadius: 200,
  },
  playButtonText: {
    color: "#FFF",
    fontFamily: Strings.titleFont,
    fontSize: 13,
  },
  songsList: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 5,
    height: window.height - STICKY_HEADER_HEIGHT,
  },
  song: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255, .2)",

  },
  songTitle: {
    color: "white",
    fontFamily: Strings.titleFont,
    fontSize: 18,
    marginBottom: 5,
  },
  albumTitle: {
    color: "#BBB",
    fontFamily: Strings.titleFont,
    fontSize: 12
  },

});