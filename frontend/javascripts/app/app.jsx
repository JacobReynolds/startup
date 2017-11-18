import React from 'react'
import {push} from "react-router-redux"
import {connect} from 'react-redux';
import {clearErrorAction, clearMessageAction} from '../actions/util.js';
@connect((store,props)=>{
  return store;
})
class App extends React.Component {
  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
    this.clearError = this.clearError.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }
  goTo(place) {
    this.props.dispatch(push('/'+place));
  }
  componentWillReceiveProps() {
  }
  clearError() {
    this.props.dispatch(clearErrorAction());
  }
  clearMessage() {
    this.props.dispatch(clearMessageAction());
  }
  componentWillMount() {
  }
  render() {
    return (
      <div className="app">
      <div id="nav"><button onClick={()=>{this.goTo('')}}>Home</button><button onClick={()=>{this.goTo('register')}}>Register</button><button onClick={()=>{this.goTo('login')}}>Login</button><button onClick={()=>{this.goTo('profile')}}>Profile</button></div>
      <div id="error" className={this.props.util.error?'active':''}>{this.props.util.error}<span onClick={this.clearError}>X</span></div>
      <div id="message" className={this.props.util.message?'active':''}>{this.props.util.message}<span onClick={this.clearMessage}>X</span></div>
        {this.props.children}
      </div>
    );
  }
}

export default App
