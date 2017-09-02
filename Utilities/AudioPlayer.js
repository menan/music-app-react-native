
import Strings from './Strings'
import Sound from 'react-native-sound'
import MusicControl from 'react-native-music-control'

import  {
  Platform
} from 'react-native';

const PlayerState = {
  NONE: 0,
  PLAYING: 1,
  PAUSED: 2,
  LOADED: 3,
  FAILED: 0,
};

const RepeatState = {
  NONE: 0,
  SHUFFLE: 1,
  REPEAT: 2,
  REPEAT_ONE: 3
};

let playlist = []
let sound = new Sound('')
let currentIndex = 0
let duration = 0
let currentTime = 0
let state = PlayerState.NONE
let repeatState = RepeatState.NONE
let timer = null



export class AudioPlayer {
    constructor(){

    }

    getCurrentSong(){
        if (playlist.length > currentIndex)
            return playlist[currentIndex]
    }

    getPlaylist(){
        return playlist
    }
    getPlayerState(){
        return this.state
    }

    addToPlaylist(song){
        console.log('adding to playlist',song)
        if (!song) return;
        playlist.push(song)
    }

    pause(){
        sound.pause()
        this.state = PlayerState.PAUSED

        MusicControl.updatePlayback({
            state: MusicControl.STATE_PAUSED
        })
    }

    play(){
        sound.play()
        this.state = PlayerState.PLAYING

        sound.getCurrentTime((seconds) => {
            MusicControl.updatePlayback({
                elapsedTime: seconds
            })
        });
    }
    
    seekTo(seconds){
        sound.setCurrentTime(seconds);
    }

    setMuted(value){
        if (value){
            sound.setVolume(0)
        }
        else{
            sound.setVolume(1)            
        }
    }

    setRepeatState(value){
        repeatState  = value
    }

    togglePlay(){
        if (this.state == PlayerState.PLAYING){
            this.play()
        }
        else{
            this.pause()
        }
    }

    playNext(){
        console.log(`playlist: ${playlist} ${currentIndex}`)
        let song = playlist[currentIndex]
        if (!song || playlist.length == 0 || currentIndex >= playlist.length) return
        currentIndex++
        this.playSong(song)
    }
    playPrev(){
        if (currentIndex >= 0) return
        currentIndex--
        this.playSong(playlist[currentIndex])
    }

    playSong(song){
        this.addToPlaylist(song)
        currentIndex = playlist.length - 1
        console.log('added song and playing', playlist, currentIndex)
        Sound.setCategory('Playback', false)
        let fileURL = song.song_url
        const directory = ''

        if (song.status == 2){
            fileURL = song.local_path
        }
        else{
            if (Platform.OS == 'android'){
                this.state = PlayerState.FAILED
                return
            }
        }
        console.log('trying to play', fileURL)

        sound.stop()
        sound = new Sound(fileURL, directory, (error) => {
            if (error) {
                this.state = PlayerState.FAILED
                console.log('failed to load the sound', error)
                return
            }
            duration = sound.getDuration()
            this.state = PlayerState.PLAYING

            this.updateMusicControl(song)
            timer = setInterval(this.updateTime.bind(this, sound), 1000)
            sound.play((success) => {
                if (success) {
                    console.log('successfully finished playing')
                    this.playNext()
                } else {
                    this.state = PlayerState.FAILED
                    console.log('playback failed due to audio decoding errors')
                }
            })
        })
    }

    getDuration(){
        if (duration && duration > 0){
            return duration
        }
        return 0
    }

    updateTime(){
        sound.getCurrentTime((seconds) => {
            currentTime = seconds
            MusicControl.updatePlayback({
                elapsedTime: seconds
            })
        })
    }

    getTime(){
        return currentTime
    }
    

    updateMusicControl(song){
        MusicControl.enableBackgroundMode(true);
        MusicControl.setNowPlaying({
            title: song.title,
            artwork: song.album.art_url, // URL or RN's image require()
            artist: song.album.music,
            album: song.album.title,
            duration: sound.getDuration(), // (Seconds)
            description: '', // Android Only
            color: 0xFFFFFF, // Notification Color - Android Only
            date: '2017-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
            rating: 84 // Android Only (Boolean or Number depending on the type)
        })
    }

}