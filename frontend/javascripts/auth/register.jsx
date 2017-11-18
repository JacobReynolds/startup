import React from 'react'
import {push} from "react-router-redux"
import {connect} from 'react-redux';
import {errorAction, clearErrorAction} from '../actions/util.js';
import {registerAction} from '../actions/auth.js';

@connect((store, props) => {
  return store;
})
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }
  componentWillReceiveProps() {}
  submitForm(e) {
    e.preventDefault();
    if (e.target.password.value !== e.target.confirmPassword.value) {
      this.props.dispatch(errorAction("Passwords do not match"));
    } else {
      if (this.props.util.error) {
        this.props.dispatch(clearErrorAction());
      }
      this.props.dispatch(registerAction(e.target.username.value, e.target.email.value, e.target.password.value));
    }
  }
  render() {
    return (
      <div id="register">
        Welcome! Please create an account to begin.
        <form onSubmit={this.submitForm}>
          <input name="email" required autoFocus type="email" placeholder="Email"/>
          <input name="username" required type="text" max="25" placeholder="Username"/>
          <input name="password" required type="password" placeholder="Password"/>
          <input name="confirmPassword" required type="password" placeholder="Confirm Password"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Register
