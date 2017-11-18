import React from 'react'
import {push} from "react-router-redux"
import {connect} from 'react-redux';
import {errorAction, clearErrorAction} from '../actions/util.js';
import {confirmProfileAction} from '../actions/auth.js';

@connect((store, props) => {
  return store;
})
class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(confirmProfileAction(this.props.match.params.confirmationToken)).then(() => {
      this.props.dispatch(push('/login'));
    }).catch(() => {
      this.props.dispatch(push('/home'));
    });
  }
  render() {
    return (
      <div id="confirmEmail">
        Confirming...
      </div>
    );
  }
}

export default Register
