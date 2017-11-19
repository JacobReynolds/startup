import React from 'react'
import {push} from "react-router-redux"
import {connect} from 'react-redux';
import {getProfileAction, logoffAction, deleteProfileAction} from '../actions/profile.js';
import {setAuthToken} from '../util/axios.js';

@connect((store, props) => {
  return store;
})
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.logoff = this.logoff.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
  }
  logoff() {
    this.props.dispatch(logoffAction()).then(() => {
      this.props.dispatch(push('/'));
      setAuthToken(null);
      localStorage.setItem('authToken', null)
    })
  }
  deleteProfile() {
    if (confirm("Are you sure?  This will delete all profile data")) {
      this.props.dispatch(deleteProfileAction()).then(() => {
        this.props.dispatch(push('/'));
        localStorage.setItem('authToken', null);
      })
    }
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
        <button onClick={this.deleteProfile}>Delete account</button>
        <button onClick={this.logoff}>Log off</button>
      </div>
    );
  }
}

export default Profile
