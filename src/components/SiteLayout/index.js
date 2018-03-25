import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import GoogleSignIn from '../GoogleSignIn';
import AlexaListing from '../AlexaListing';

class SiteLayout extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'
            component={()=>(<GoogleSignIn/>)} />
          <Route path='/home'
            component={()=>(<AlexaListing/>)} />
        </Switch>
      </Router>
    );
  }
}

export default SiteLayout;
