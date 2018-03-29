import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { withRouter, Redirect } from 'react-router-dom';
import { fetchUserToken } from '../../actions/userLogin';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import './GoogleSignIn.css';

class GoogleSignIn extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.info = this.info.bind(this);
  }

  responseGoogle(response) {
    const alexaId = '';
    this.props.fetchUserToken(response, alexaId, this.info, this.props.history);
  }

  info() {
    Modal.info({
      title: 'UNAUTHORIZED USER',
      content: (
        <div>
          <p>Unauthorized user, please log in using Alexa first</p>
        </div>
      ),
      onOk() { },
    });
  }

  render() {
    if (this.props.userDetails.loginStatus) {
      return (
        <Redirect to='/home'/>
      )
    }
    else {
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
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUserToken: (googleResponse, alexaId, showInfo, routeToHome) => {
      dispatch(fetchUserToken(googleResponse, alexaId, showInfo, routeToHome))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userDetails: state.userDetails
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoogleSignIn));
