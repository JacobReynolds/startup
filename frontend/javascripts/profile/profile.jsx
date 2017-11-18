import React from 'react'
import {push} from "react-router-redux"
import {connect} from 'react-redux';
import {getProfileAction} from '../actions/profile.js';
import {logoffAction} from '../actions/auth.js';

@connect((store, props) => {
  return store;
})
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.logoff = this.logoff.bind(this);
  }
  logoff() {
    this.props.dispatch(logoffAction()).then(() => {
      this.props.dispatch(push('/'));
      localStorage.setItem('authToken', null)
    })
  }
  componentWillMount() {
    this.props.dispatch(getProfileAction()).catch(() => {
      this.props.dispatch(push('/'))
    });
  }
  render() {
    var ready = this.props.profile.fetched;
    if (!ready) {
      return <div id="profile">Fetching Profile</div>
    } else if (this.props.profile.error) {
      return <div id="profile">Error fetching profile</div>
    }
    return (
      <div id="profile">
        <div>Hello @{this.props.profile.username}</div>
        <button onClick={this.logoff}>Log off</button>
      </div>
    );
  }
}

export default Profile
