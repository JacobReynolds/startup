import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, ConnectedRouter} from 'react-router-redux'
import {Route, Switch} from 'react-router-dom'
import reducers from './reducers'
import {store, browserHistory} from './store.js';
import style from './util/style.jsx'

import App from './app/app.jsx'
import Home from './home/home.jsx'
import Register from './profile/register.jsx'
import Login from './profile/login.jsx'
import ConfirmProfile from './profile/confirm.jsx'
import Profile from './profile/profile.jsx'
import ForgotPassword from './profile/forgot.jsx';
import ResetPassword from './profile/reset.jsx';

ReactDOM.render(
  <Provider store={store}>
  <ConnectedRouter history={browserHistory}>
    <App>
      <Route exact path="/" component={Home}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/profile/forgot" component={ForgotPassword}/>
      <Route exact path="/profile/confirm/:confirmationToken" component={ConfirmProfile}/>
      <Route exact path="/profile/reset/:resetToken" component={ResetPassword}/>
    </App>
  </ConnectedRouter>
</Provider>, document.getElementById('app'))
