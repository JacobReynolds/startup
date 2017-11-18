import promise from 'redux-promise-middleware';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {
  routerMiddleware
} from 'react-router-redux'
import {
  createStore,
  applyMiddleware
} from 'redux'
import reducers from './reducers'
const browserHistory = createHistory()
const middleware = routerMiddleware(browserHistory)
import createHistory from 'history/createBrowserHistory'

//Create a store for react-redux to use, apply any necessary middleware
var store;
if (process.env.NODE_ENV === 'production') {
  store = createStore(reducers, applyMiddleware(promise(), routerMiddleware(browserHistory), thunk))
} else {
  store = createStore(reducers, applyMiddleware(promise(), routerMiddleware(browserHistory), logger, thunk))
}
export {
  store,
  browserHistory
};
