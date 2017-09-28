import React, { Component } from 'react';

import {
  AsyncStorage,
  Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Strings from '../Utilities/Strings'
import {Storage} from '../Utilities/Storage';
import { FileSystem } from '../Utilities/FileSystem';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const storage = new Storage()

export default class LikeButton extends React.Component{
    constructor(props){
        super(props)
        this.likeSong = this.likeSong.bind(this);
        this.state = {
            liked: false,
            song: this.props.song,
        }
    }
    
    render(){
        let prefix =  (Platform.OS == 'android') ? 'md' : 'ios'
        if (this.state.song.status){
            if (this.state.song.status == 2){
                return (
                    <Icon onPress={this.removeSong} name={`${prefix}-cloud-done`} size={25} color={Strings.tintColor} />
                )
            }
            else if (this.state.song.status == 1){
                return (
                    <AnimatedCircularProgress
                        size={23}
                        width={3}
                        fill={this.state.song.progress}
                        tintColor={Strings.tintColor}
                        backgroundColor="#fff" />
                )
            }
        }
        return (
            <Icon onPress={this.likeSong} name={this.state.liked ? `${prefix}-heart` : `${prefix}-heart-outline`} size={25} color={this.state.liked ? Strings.tintColor : '#fff'} />
        )
    }
    componentDidMount(){
        this.checkLike()
    }

    removeSong(){
        console.log('remove song')
    }

    likeSong(){
        if (this.props.songs){
            return this.likeAllSongs(this.props.songs)
        }
        console.log('this state', this.state)
        if (this.state.liked){
            storage.unlikeSong(this.props.song, this.props.album)
            this.setState({
                liked: false
            })
            this.props.song.liked = false
        }
        else{
            storage.likeSong(this.props.song, this.props.album)
            this.setState({
                liked: true
            })
            this.props.song.liked = true
            this.beginDownload()
        }
        
        console.log('liking song', this.props.song)
    }

    beginDownload(){
        new FileSystem().downloadSong(this.props.song, false, function(thisSong, status, progress){            
            this.setState({
                song: {
                    status: status,
                    progress: progress
                },
            });
        }.bind(this))
    }

  checkLike() {
    this.setState({
        liked: storage.checkLiked(this.props.song),
    });
  }

}

