import axios from 'axios';
const Config = require('../config');
const url = Config.baseUrl;

const fetchListFailure = () => ({
  type: 'RECEIVE_ALEXA_LIST_FAILURE'
});

const fetchListSuccess = (obj) => ({
  type: 'RECEIVE_ALEXA_LIST_SUCCESS',
  payload: obj
});

export const listAlexa = (userId) => {
  return (dispatch) => {
    axios.get(url + '/device/list?userId=' + userId)
    .then((response) => {
      dispatch(fetchListSuccess(response.data.deviceList));
    })
    .catch((error) => {
      dispatch(fetchListFailure());
    });
  }
}