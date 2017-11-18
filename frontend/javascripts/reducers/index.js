import {combineReducers} from 'redux'
import home from './home.js'
import util from './util.js'
import profile from './profile.js'
import routing from './routing.js'
export default combineReducers({home, routing, util, profile})
