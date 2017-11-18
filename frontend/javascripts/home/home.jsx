import React from 'react'
import {push} from "react-router-redux"
import {connect} from 'react-redux';

@connect((store,props)=>{
  return store;
})
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps() {
  }
  render() {
    return (
      <div className="shopping-list">
        Welcome to the home page!  Use the navigation bar above to check out the site.
      </div>
    );
  }
}

export default Home
