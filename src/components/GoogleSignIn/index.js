import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { withRouter, Redirect } from 'react-router-dom';
import { fetchUserToken } from '../../actions/userLogin';
import { connect } from 'react-redux';
import { Modal, Spin, Icon } from 'antd';
import './GoogleSignIn.css';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class GoogleSignIn extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.info = this.info.bind(this);
    this.getSearchParameters = this.getSearchParameters.bind(this);
    this.transformToAssocArray = this.transformToAssocArray.bind(this);
  }

  responseGoogle(response) {
    const alexaId = '';
    this.props.fetchUserToken(response, alexaId, this.info, this.props.history, this.alexaParams);
  }

  getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? this.transformToAssocArray(prmstr) : {};
  }

  transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
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

  componentDidMount() {
    this.alexaParams = this.getSearchParameters() || null;
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
    fetchUserToken: (googleResponse, alexaId, showInfo, routeToHome, alexaParams) => {
      dispatch(fetchUserToken(googleResponse, alexaId, showInfo, routeToHome, alexaParams))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userDetails: state.userDetails
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoogleSignIn));
