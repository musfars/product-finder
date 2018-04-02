import React, { Component } from 'react';
import UserDetailsBar from '../UserDetailsBar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogInStatus } from '../../actions/userLogin';
import { listAlexa } from '../../actions/listAlexa';
import AlexaListingTable from '../AlexaListingTable';
import './AlexaListingPage.css';

class AlexaListingPage extends Component {
  componentDidMount() {
    const userId = this.props.userDetails.userId;
    this.props.listAlexa(userId);
  }

  render() {
    if (!this.props.userDetails.loginStatus) {
      return (
        <Redirect to='/' />
      )
    }
    else {
      return (
        <div>
          <UserDetailsBar userName={this.props.userDetails.userName}
            userImage={this.props.userDetails.imageUrl} />
          <AlexaListingTable alexaListing={this.props.alexaListing} />
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userLogInStatus: () => {
      dispatch(userLogInStatus());
    },
    listAlexa: (userId) => {
      dispatch(listAlexa(userId));
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userDetails: state.userDetails,
    alexaListing: state.alexaListing
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlexaListingPage);
