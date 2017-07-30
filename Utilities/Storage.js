import Realm from 'realm'

const SongSchema = {
  name: 'Song',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    title: 'string',
    song_url: 'string',
    local_path: 'string',
    status: 'int', //0: none, 1: downloading, 2: downloaded, 3: failed
    progress: 'int',
  }
};

const AlbumSchema = {
  name: 'Album',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    title: 'string',
    art_url: 'string',
    artists: 'string',
    copyright: 'string',
    music: 'string',
    singers: 'string',
    writers: 'string',
    songs: {type: 'list', objectType: 'Song'},
  }
};

const DownloadQueueSchema = {
  name: 'DownloadQueue',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    parellel_downloads: 'int',
    priority: 'int',
    songs: {type: 'list', objectType: 'Song'},
  }
};


let realm = new Realm({schema: [AlbumSchema, SongSchema, DownloadQueueSchema]});

export class Storage {
    constructor(){

    }

    findOrCreateSong(song){
        let realmSong = realm.objectForPrimaryKey('Song', song.id);

        if (realmSong){
            return realmSong
        }
        // Add new cars to the list
        realm.write(() => {
            realmSong = realm.create('Song', {
                id: song.id,
                title: song.title,
                song_url: song.song_url,
                local_path: '',
                status: 0,
                progress: 0,
            })
        });

        return realmSong
    }
    getQueue(){
        return realm.objectForPrimaryKey('DownloadQueue',1)
    }

    likeSong(song, album){
        let realmAlbum = realm.objectForPrimaryKey('Album', album.id);
        
        if(!realmAlbum){
            // Add new cars to the list
            realm.write(() => {
                realmAlbum = realm.create('Album', {
                    id: album.id,
                    title: album.title,
                    art_url: album.art_url,
                    artists: album.artists,
                    copyright: album.copyright,
                    music: album.music,
                    singers: album.singers,
                    writers: album.writers,
                })
            });
        }

        console.log('realmAlbum: ', realmAlbum);

        let realmSong = realm.objectForPrimaryKey('Song', song.id);

        if (!realmSong){
            realmSong = {
                    id: song.id,
                    title: song.title,
                    song_url: song.song_url,
                    local_path: '',
                    status: 0,
                    progress: 0,
                }
        }

        realm.write(() => {
            realmAlbum.songs.push(realmSong)
        });

        this.addToDownloadQueue([realmSong])

    }
    unlikeSong(song, album){
        let realmSong = realm.objectForPrimaryKey('Song', song.id);

        // new FileSystem().deleteSong(song)

        if (realmSong){
            realm.write(() => {
                realm.delete(realmSong)
            })
            console.log('deleted song from realm', song)
        }
        this.removeFromDownloadQueue(realmSong)
    }

    getSongById(id){
        return realm.objectForPrimaryKey('Song', id)
    }
    getFirstSong(){
        return realm.objects('Song')[0]
    }
    getFirstAlbum(){
        return realm.objects('Album')[0]
    }
    checkLiked(song){
        let realmSong = realm.objectForPrimaryKey('Song', song.id);

        if (realmSong){
            return true
        }
        return false
    }

    getAllAlbums(){
        return realm.objects('Album')
    }

    updateLocallyAvailable(song, available, path) {
        let realmSong = realm.objectForPrimaryKey('Song', song.id)
        if (!realmSong){
            console.log('realm song not found',song)
            return;
        }

        realm.write(() => {
            realmSong.status = 2;
            realmSong.local_path = path;
        });
        this.removeFromDownloadQueue(realmSong)
    }


    updateProgress(song, progress){
        let realmSong = realm.objectForPrimaryKey('Song', song.id)

        if (!realmSong){
            console.log('realm song not found',song)
            return;
        }

        realm.write(() => {
            realmSong.status = 2
            realmSong.progress = progress
        });
    }

    getAllSongs(){
        return realm.objects('Song').filtered('status != 2')
    }

    removeFromDownloadQueue(song){
        let downloadQueue = this.getQueue()

        realm.write(() => {
            if (!downloadQueue){
                console.log('realm song not found',song)
                return;
            }
            try{
                downloadQueue.songs = downloadQueue.songs.slice(1, downloadQueue.songs.length)
            }
            catch(e){
                console.log('error while popping', e)
            }
            console.log('done')
        });
    }

    addToDownloadQueue(songs){
        console.log('adding to download queue', songs.length)
        let queue = this.getQueue()
        if (queue){
            console.log('adding to existing queue', songs)
            realm.write(() => {
                songs.forEach(function(song){

                    let realmSong = realm.objectForPrimaryKey('Song', song.id);

                    if (!realmSong){
                        realmSong = realm.create('Song', {
                            id: song.id,
                            title: song.title,
                            song_url: song.song_url,
                            local_path: '',
                            status: 0,
                            progress: 0,
                        })
                    }


                    try{
                        queue.songs.push(song)
                    }
                    catch(e){
                        console.log('error adding to queue', e)
                    }
                })
                console.log("finished writing songs")
            });
            console.log('added queue.songs: ',queue.songs.length)
            return;
        }
        console.log('adding to new download queue')
        realm.write(() => {
            let queue = realm.create('DownloadQueue', {
                id: 1,
                parellel_downloads: 2,
                priority: 1
            })
            songs.forEach(function(song){
                let realmSong = realm.objectForPrimaryKey('Song', song.id);
                if (!realmSong){
                    realmSong = realm.create('Song', {
                        id: song.id,
                        title: song.title,
                        song_url: song.song_url,
                        local_path: '',
                        status: 0,
                        progress: 0,
                    })
                }
                try{
                    queue.songs.push(song)
                }
                catch(e){
                    console.log('error adding to queue', e)
                }
            })


        });
        console.log('Done')
    }

    getSongsFromQueue(){
        let queue = this.getQueue()
        console.log('queue', queue.songs)
        return queue.songs
    }
}


