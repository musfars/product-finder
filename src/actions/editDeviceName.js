import axios from 'axios';
const Config = require('../config');
const url = Config.baseUrl;

const editDeviceNameFailure = () => ({
  type: 'EDIT_DEVICE_NAME_FAILURE'
});

const editDeviceNameSuccess = () => ({
  type: 'EDIT_DEVICE_NAME_SUCCESS'
});

export const editDeviceName = (deviceId, value) => {
  return (dispatch) => {
    axios.post(url + '/device/edit',{
      "deviceId": deviceId,
      "name": value
    })
      .then((response) => {
        dispatch(editDeviceNameSuccess());
      })
      .catch((error) => {
        console.log(error)
        dispatch(editDeviceNameFailure());
      });
  }
}