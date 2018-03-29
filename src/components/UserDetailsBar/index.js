import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { logOutUser } from '../../actions/userLogin';
import { connect } from 'react-redux';
import './UserDetailsBar.css';

class UserDetailsBar extends Component {
  constructor() {
    super();
    this.logOutUser = this.logOutUser.bind(this);
  }
  logOutUser() {
    this.props.logOutUser();
    this.props.history.push('/');
  }
  render() {
    const popTitle = (
      <div style={{ textAlign: 'center' }}>
        {this.props.userName}
      </div>
    );
    const popContent = (
      <Button style={{ width: '100%' }} onClick={this.logOutUser}>
        Logout
      </Button>
    );
    return (
      <div className='bar-container'>
        <div className='header-text'>PRODUCT FINDER</div>
        <Popover
          placement='bottom'
          title={popTitle}
          content={popContent}
          trigger='click'>
          <div className='image-container'>
            <img className='header-google-userimage'
            src={this.props.userImage}
            alt='Profile'/>
          </div>
        </Popover>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logOutUser: () => {
      dispatch(logOutUser)
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(UserDetailsBar));