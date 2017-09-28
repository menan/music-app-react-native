import * as types from './types'
import Api from '../lib/api'
import Strings from '../Utilities/Strings'


export function fetchAlbums(){
    return (dispatch, getState) => {
        return Api.get(Strings.albumsPath).then(resp => {
            dispatch(setFetchedAlbums({ albums: resp }))
        }).catch( (ex) => {
            console.log(ex);
        })
    }
}

export function setFetchedAlbums( { albums }){
    return {
        type: types.SET_FETCHED_ALBUMS,
        albums
    }
}

export function setFavSong() {
    return {
        type: types.SET_FAV_SONG,
    }
}