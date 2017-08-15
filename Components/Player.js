import React, { Component } from 'react';

import  {
  AppRegistry,
  Image,
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Platform
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';
import Sound from 'react-native-sound';
import MusicControl from 'react-native-music-control';

import LikeButton from './LikeButton';

import Strings from '../Utilities/Strings';
import { Storage } from '../Utilities/Storage'

const window = Dimensions.get('window');
const timer = null;

const storage = new Storage()

export default class Player extends React.Component {
  constructor(props){
    super(props);
    console.log('constructing', props)
    this.state = {
      song: null,
      playing: true,
      muted: false,
      shuffle: false,
      sliding: false,
      currentTime: 0,
      songDuration: 1,
      songIndex: props.songIndex,
    };
    
  }

  togglePlay(){
    if(this.state.playing){
      this.props.passProps.pause()
      // this.props.passProps.getCurrentTime((seconds) => {
      //   // Changes the state to paused
      //   MusicControl.updatePlayback({
      //     state: MusicControl.STATE_PAUSED,
      //     elapsedTime: seconds
      //   })
      // });
    }
    else{
      this.props.passProps.play()
      // this.props.passProps.getCurrentTime((seconds) => {
      //   // Changes the state to paused
      //   MusicControl.updatePlayback({
      //     elapsedTime: seconds
      //   })
      // });
    }
    this.setState({ playing: !this.state.playing });
  }
  
  
  toggleVolume(){
    this.setState({ muted: !this.state.muted });
    this.props.passProps.setMuted(!this.state.muted)
  }

  toggleShuffle(){
    this.setState({ shuffle: !this.state.shuffle });
  }

  goBackward(){
    if(this.state.currentTime < 3 && this.state.songIndex !== 0 ){
      this.setState({
        songIndex: this.state.songIndex - 1,
        currentTime: 0,
      });
    } else {
      this.props.passProps.setCurrentTime(0);
      this.setState({
        currentTime: 0,
      });
    }
  }

  goForward(){
    this.setState({
      songIndex: this.state.shuffle ? this.randomSongIndex() : this.state.songIndex + 1,
      currentTime: 0,
    });
  }

  randomSongIndex(){
    let maxIndex = this.props.songs.length - 1;
    return Math.floor(Math.random() * (maxIndex - 0 + 1)) + 0;
  }

  setTime(params){
    if( !this.state.sliding ){
      this.setState({ currentTime: params.currentTime });
    }
  }

  onLoad(params){
    this.setState({ songDuration: params.duration });
  }

  onSlidingStart(){
    this.setState({ sliding: true });
  }

  onSlidingChange(value){
    let newPosition = value * this.state.songDuration;
    this.setState({ currentTime: newPosition });
  }

  onSlidingComplete(){
    console.log('current time', this.state.currentTime)
    this.props.passProps.seekTo(this.state.currentTime)
    this.setState({ sliding: false });
  }

  onEnd(){
    this.setState({ playing: false });
  }

  updateTime(sound, obj){
    sound.getCurrentTime((seconds) => {
      // Changes the volume
      MusicControl.updatePlayback({
        elapsedTime: seconds
      })
      this.setState({ currentTime: seconds});
    })
  }

  playCurrentSong(){
    console.log('coming with a song', this.state, this.props)
    if (this.props.songs && this.props.songs.length > 0 && this.props.songIndex < this.props.songs.length && this.props.album){
      console.log('coming with a song', this.state, this.props)
      let song = this.props.songs[this.props.songIndex]
      song.album = this.props.album
      this.setState({
        song: song
      });

      this.props.passProps.playSong(song)
      return;
    }
    
    console.log('showing just player', this.state, this.props)
    this.setState({
      song: this.props.passProps.getCurrentSong()
    });
    console.log('this state', this.state, this.props.passProps.getCurrentSong())
    return;

    var fileURL = song.song_url
    var directory = ''
    console.log('playing song',song)

    if (song.status == 2){
      fileURL = song.local_path
      // directory = Sound.DOCUMENT
    }
    else{
        if (Platform.OS == 'android')
            return;
    }
    console.log('playing from url', 'Sound.DOCUMENT', fileURL)

      // Enable playback in silence mode (iOS only)
      Sound.setCategory('Playback');
      this.props.passProps.stop()
      // Load the sound file 'whoosh.mp3' from the app bundle
      // See notes below about preloading sounds within initialization code below.
      this.props.passProps.sound = new Sound(fileURL, directory, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        this.setState({ songDuration: this.props.passProps.sound.getDuration() });
        // loaded successfully
        console.log('duration in seconds: ' + this.props.passProps.sound.getDuration() + ', number of channels: ' + this.props.passProps.sound.getNumberOfChannels());
        this.updateMusicControl()
        timer = setInterval(this.updateTime.bind(this, this.props.passProps.sound), 1000);
        // Play the sound with an onEnd callback
        this.props.passProps.sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');


          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });

            // Get the current playback point in seconds
            this.props.passProps.sound.getCurrentTime((seconds) => console.log('at ' + seconds));
      });


  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.songIndex === this.state.songIndex) return;
    clearTimeout(timer);
    this.playCurrentSong();
  }

  componentWillUnmount(){
    clearTimeout(timer);
  }

  componentDidMount(){
    console.log('component did mount')
    StatusBar.setBarStyle('light-content', true)
    this.playCurrentSong()
  }



  render() {
    let song = this.state.song
    console.log('rendering song',song)
    if(!song) return(
      <View></View>
    );
    let songPercentage;
    if( this.state.songDuration !== undefined ){
      songPercentage = this.state.currentTime / this.state.songDuration;
    } else {
      songPercentage = 0;
    }

    let playButton;
    if( this.state.playing ){
      playButton = <Icon onPress={ this.togglePlay.bind(this) } style={ styles.play } name="ios-pause" size={70} color="#fff" />;
    } else {
      playButton = <Icon onPress={ this.togglePlay.bind(this) } style={ styles.play } name="ios-play" size={70} color="#fff" />;
    }

    let forwardButton = <Icon onPress={ this.goForward.bind(this) } style={ styles.forward } name="ios-skip-forward" size={25} color="#fff" />;


    let volumeButton;
    if( this.state.muted ){
      volumeButton = <Icon onPress={ this.toggleVolume.bind(this) } style={ styles.volume } name="md-volume-off" size={18} color="#fff" />;
    } else {
      volumeButton = <Icon onPress={ this.toggleVolume.bind(this) } style={ styles.volume } name="md-volume-up" size={18} color="#fff" />;
    }

    let shuffleButton;
    if( this.state.shuffle ){
      shuffleButton = <Icon onPress={ this.toggleShuffle.bind(this) } style={ styles.shuffle } name="ios-shuffle" size={18} color="#f62976" />;
    } else {
      shuffleButton = <Icon onPress={ this.toggleShuffle.bind(this) } style={ styles.shuffle } name="ios-shuffle" size={18} color="#fff" />;
    }

    let image = song.albumImage ? song.albumImage : song.album.art_url;
    return (
      <View style={styles.container}>

        <View style={ styles.header }>
          <Text style={ styles.headerText }>
            { song.album.title }
          </Text>
        </View>
        <View style={ styles.headerClose }>
          <Icon onPress={ Actions.pop }  name={(Platform.OS === 'ios') ? "ios-arrow-back" :  "md-arrow-back"} size={30} color="#fff" />
        </View>
        <View style={ styles.headerLike }>
          <LikeButton song={song} album={song.album}/>
        </View>
        <Image
          style={ styles.songImage }
          source={{uri: image,
                        width: window.width - 30,
                        height: 300}}/>
        <Text style={ styles.songTitle }>
          { song.title }
        </Text>
        <Text style={ styles.albumTitle }>
          { song.album.artists }
        </Text>
        <View style={ styles.sliderContainer }>
          <Slider
            onSlidingStart={ this.onSlidingStart.bind(this) }
            onSlidingComplete={ this.onSlidingComplete.bind(this) }
            onValueChange={ this.onSlidingChange.bind(this) }
            minimumTrackTintColor='#851c44'
            style={ styles.slider }
            trackStyle={ styles.sliderTrack }
            thumbStyle={ styles.sliderThumb }
            value={ songPercentage }/>

          <View style={ styles.timeInfo }>
            <Text style={ styles.time }>{ formattedTime(this.state.currentTime)  }</Text>
            <Text style={ styles.timeRight }>- { formattedTime( this.state.songDuration - this.state.currentTime ) }</Text>
          </View>
        </View>
        <View style={ styles.controls }>
          { shuffleButton }
          <Icon onPress={ this.goBackward.bind(this) } style={ styles.back } name="ios-skip-backward" size={25} color="#fff" />
          { playButton }
          { forwardButton }
          { volumeButton }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    marginTop: 25,
    marginBottom: 10,
    width: window.width,
  },
  headerClose: {
    position: 'absolute',
    top: 15,
    left: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerLike: {
    position: 'absolute',
    top: 15,
    right: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    color: "#FFF",
    fontSize: 22,
    marginTop: 5,
    textAlign: 'center',
    fontFamily: Strings.titleFont,
  },
  songImage: {
    marginBottom: 20,
    borderRadius: 3
  },
  songTitle: {
    color: "white",
    fontFamily: Strings.titleFont,
    marginBottom: 10,
    marginTop: 13,
    fontSize: 19
  },
  albumTitle: {
    color: "#BBB",
    fontFamily: Strings.titleFont,
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    marginTop: (Platform.OS === 'ios') ? 30 : 0,
  },
  back: {
    marginTop: 22,
    marginLeft: 45,
  },
  play: {
    marginLeft: 50,
    marginRight: 50,
  },
  forward: {
    marginTop: 22,
    marginRight: 45,
  },
  shuffle: {
    marginTop: 26,
  },
  volume: {
    marginTop: 26,
  },
  sliderContainer: {
    width: window.width - 40,
  },
  timeInfo: {
    flexDirection: 'row',
  },
  time: {
    color: '#FFF',
    flex: 1,
    fontSize: 10,
  },
  timeRight: {
    color: '#FFF',
    textAlign: 'right',
    flex: 1,
    fontSize: 10,
  },
  slider: {
    height: 20,
  },
  sliderTrack: {
    height: 2,
    backgroundColor: '#333',
  },
  sliderThumb: {
    width: 10,
    height: 10,
    backgroundColor: '#f62976',
    borderRadius: 10 / 2,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
  }
});

//TODO: Move this to a Utils file
function withLeadingZero(amount){
  if (amount < 10 ){
    return `0${ amount }`;
  } else {
    return `${ amount }`;
  }
}

function formattedTime( timeInSeconds ){
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds - minutes * 60;

  if( isNaN(minutes) || isNaN(seconds) ){
    return "";
  } else {
    return(`${ withLeadingZero( minutes ) }:${ withLeadingZero( seconds.toFixed(0) ) }`);
  }
}