import RNFetchBlob from 'react-native-fetch-blob'
import { Storage } from './Storage'

const storage = new Storage()

export class FileSystem {
    constructor(){

    }

    downloadSong(song, download_all, callback) {
        let dirs = RNFetchBlob.fs.dirs
        let filePath = `${dirs.DocumentDir}/s/${song.id}.mp3`

        RNFetchBlob.fs.exists(filePath)
        .then((exist) => {
            if (exist){
                console.log(`${song.title} song found`)
                storage.updateLocallyAvailable(song, true, filePath)
                if(callback) callback(song, 2 , 100)
                if(download_all) this.downloadNextSong()

                console.log('done downloading.')
            }
            else{
                console.log(`${song.title} not found, downloading`)
                this.downloadFile(song.song_url, filePath, song, download_all, callback)
            }

        })
        .catch(() => { })


    }

    downloadFile(url, path, song, download_all, callback){
        RNFetchBlob
        .config({path : path})
        .fetch('GET', url)
        .progress({ interval : 100 }, (received, total) => {
            let percent = Math.floor(received/total*100)
            console.log(`download progress: ${percent}%`)
            storage.updateProgress(song, percent)
            if(callback) callback(song, 1, percent)
        })
        
        .then((res) => {
            // the path should be dirs.DocumentDir + 'path-to-file.anything'
            console.log('The file saved to ', song)
            storage.updateLocallyAvailable(song, true, path)
            if(callback) callback(song, 2, 100)
            if(download_all) this.downloadNextSong()
        })
    }

    deleteSong(song){
        console.log('deleting song', song)
        RNFetchBlob.fs.unlink(song.local_path)
        .then(() => {
            console.log('song removed locally', song.title)
        })
        .catch((err) => {
            console.log('error removing song locally', song.title, err)
        })


    }

    downloadAllSongs(){
        let songs = storage.getAllSongs()
        storage.addToDownloadQueue(songs)
        this.initiateDownload()
    }
    downloadNextSong(){
        console.log('downlaoding next song')
        let songs = storage.getSongsFromQueue()
        console.log('song length', songs.length)

        if (songs.length == 0) return;
        let song = songs[0]
        console.log('downlaoding', song.title)
        this.downloadSong(song, true)
    }

    initiateDownload(){
        this.downloadNextSong()
    }
}