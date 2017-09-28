import { combineReducers } from 'redux'
import * as eelamReducer from './eelam'

export default combineReducers(Object.assign(
    eelamReducer,
))