import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { withRouter } from 'react-router-dom';
import './GoogleSignIn.css';

class GoogleSignIn extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response) {
    console.log(response);
    this.props.history.push('/home');
  }

  render() {
    return(
      <div className='google-login-page'>
        <div className='google-login-button-container'>
          <div className='logo'>PRODUCT FINDER</div>
          <GoogleLogin
            clientId="957468791003-slgmb2r2jsm6gvq88prst0evqvqb6o1n.apps.googleusercontent.com"
            buttonText="Login via Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(GoogleSignIn);
