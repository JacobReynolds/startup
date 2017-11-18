import React from 'react'
import {push} from "react-router-redux"
import {connect} from 'react-redux';
import {errorAction, clearErrorAction} from '../actions/util.js';
import {registerAction, loginAction} from '../actions/auth.js';
import {setAuthToken} from '../util/axios.js';
@connect((store, props) => {
  return store;
})
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }
  componentWillReceiveProps() {}
  login(e) {
    e.preventDefault();
    if (this.props.util.error) {
      this.props.dispatch(clearErrorAction());
    }
    this.props.dispatch(loginAction(e.target.email.value, e.target.password.value)).then((data) => {
      localStorage.setItem('authToken', data.value.data.token);
      this.props.dispatch(push('/profile'));
      setAuthToken(data.value.data.token);
    });
  }
  render() {
    return (
      <div id="login">
        Welcome! Please login.
        <form onSubmit={this.login}>
          <input name="email" required autoFocus type="email" placeholder="Email"/>
          <input name="password" required type="password" placeholder="Password"/>
          <button type="submit">Submit</button><br/>
          <button onClick={()=>{this.props.dispatch(push('/profile/forgot'))}}>Forgot password</button>
        </form>
      </div>
    );
  }
}

export default Register
