import axios from 'axios';
const Config = require('../config');
const url = Config.baseUrl;

const addProductToListFailure = () => ({
  type: 'ADD_PRODUCT_TO_LIST_FAILURE'
});

const addProductToListSuccess = (obj) => ({
  type: 'ADD_PRODUCT_TO_LIST_SUCCESS',
  payload: obj
});

export const addProductToList = (productData) => {
  return (dispatch) => {
    axios.post(url + '/product/add', productData )
      .then((response) => {
        dispatch(addProductToListSuccess(productData.productObj));
      })
      .catch((error) => {
        dispatch(addProductToListFailure());
      });
  }
}