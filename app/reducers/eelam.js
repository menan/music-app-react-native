import createReducer from '../lib/createReducer'

import * as types from '../actions/types'

export const fetchedAlbums = createReducer({}, {
    [types.SET_FETCHED_ALBUMS](state, action) {
        let newState = {};
        action.albums.forEach( (album) => {
            newState[album.id] = album
        });
        return newState;
    }
});

