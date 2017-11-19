import React from 'react'
import {push} from "react-router-redux"
import {connect} from 'react-redux';
import {messageAction, clearErrorAction} from '../actions/util.js';
import {resetPasswordAction} from '../actions/profile.js';

@connect((store, props) => {
  return store;
})
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.resetPassword = this.resetPassword.bind(this);
  }
  resetPassword(e) {
    e.preventDefault();
    if (this.props.util.error) {
      this.props.dispatch(clearErrorAction());
    }
    if (e.target.password.value !== e.target.confirmPassword.value) {
      return this.props.dispatch(errorAction("Passwords must match"));
    }
    this.props.dispatch(resetPasswordAction(e.target.password.value, this.props.match.params.resetToken)).then(() => {
      this.props.dispatch(push('/login'));
    });
  }
  render() {
    return (
      <div id="login">
        Forgot password
        <form onSubmit={this.resetPassword}>
          <input name="password" required autoFocus type="password" placeholder="Password"/>
          <input name="confirmPassword" required type="password" placeholder="Confirm Password"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ForgotPassword
