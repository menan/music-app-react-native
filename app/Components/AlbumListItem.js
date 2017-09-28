import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  ListView,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

import Strings from '../Utilities/Strings';

export default class AlbumListItem extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={ () => Actions.albumShow({ album: this.props.album, kind: 'album'}) } activeOpacity={ 100 } underlayColor="#ea4b54">
        <ImageBackground
          style={ styles.artistBg }
          resizeMode='cover'
          source={{uri:  this.props.album.art_url  }}
        >
        <View style={ styles.container }>
          <View style={styles.textContent}>
            <Text style={ styles.artistName }>{ this.props.album.title }</Text>
            <Text style={ styles.artistSongs } numberOfLines={3}>{ this.props.album.music }</Text>
          </View>
          <Image
            style={ styles.artistImage }
            source={{uri:  this.props.album.art_url  }}
          />
        </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 15,
    flexGrow: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContent:{
    width: 200
  },
  artistImage: {
    height: 90,
    width: 90,
    borderRadius: 2
  },
  artistName: {
    color: "#FFF",
    backgroundColor: 'transparent',
    fontFamily: Strings.titleFont,
    fontSize: 18,
    marginBottom: 5
  },
  artistSongs: {
    color: "lightgray",
    backgroundColor: 'transparent',
    fontFamily: Strings.titleFont,
    fontSize: 14,
  },
});

