
import Strings from './Strings';

let albums = []

export class AlbumService {
    constructor(){

    }
    getAlbums(){
        return albums
    }

    fetch(callback){
        fetch(Strings.apiUrl + Strings.albumsPath)
        .then((response) => response.json())
        .then((data) => {
            console.log('data', data)
            albums = data
            if(callback) callback(data)
        }).catch((error) => {
            console.log('Network error occured', error);
        })
        .done()
    }

}