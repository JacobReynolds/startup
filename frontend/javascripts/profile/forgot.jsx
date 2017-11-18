import React from 'react'
import {push} from "react-router-redux"
import {connect} from 'react-redux';
import {messageAction, clearErrorAction} from '../actions/util.js';
import {forgotPasswordAction} from '../actions/auth.js';
@connect((store, props) => {
  return store;
})
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.forgotPassword = this.forgotPassword.bind(this);
  }
  forgotPassword(e) {
    e.preventDefault();
    if (this.props.util.error) {
      this.props.dispatch(clearErrorAction());
    }
    this.props.dispatch(forgotPasswordAction(e.target.email.value)).then(()=>{
      this.props.dispatch(messageAction("Please check your email"));
    });
  }
  render() {
    return (
      <div id="login">
        Forgot password
        <form onSubmit={this.forgotPassword}>
          <input name="email" required autoFocus type="email" placeholder="Email"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ForgotPassword
