import axios from 'axios';
import {
  saveUserDetails,
  removeUserDetails,
  loadToken,
  loadUserState
} from '../utils/storageUtils';

const Config = require('../config');
const url = Config.baseUrl;

const setUserToken = () => {
  const token = loadToken();
  return {
    type: 'GET_USER_TOKEN',
    payload: token
  };
};

export const fetchUserToken = (googleResponse, alexaId, showInfo, routeToHome) => {
  return (dispatch) => {
    axios.post(url + '/user/login?tokenId=' +
      googleResponse.tokenId +
      '&alexaId=' + alexaId)
      .then((response) => {
        if (response.data.status === 200) {
          const userDetails = {
            userId: response.data.userId,
            userName: googleResponse.profileObj.name,
            imageUrl: googleResponse.profileObj.imageUrl
          };
          saveUserDetails(response.data.token, userDetails);
          // dispatch(setUserToken());
          dispatch(userLogInStatus());
          routeToHome.push('/home');
        }
        else if (response.data.status === 403) {
          showInfo();
        }
      })
      .catch(() => {
        console.error('Google Login Failed');
      });
  };
};

export const userLogInStatus = () => { 
  return {
  type: 'USER_LOGGED_IN',
  ...loadUserState()
  }
};

const logOutSuccess = () => ({
  type: 'USER_LOGGED_OUT'
});

export const logOutUser = (dispatch) => {
  removeUserDetails();
  dispatch(logOutSuccess());
}