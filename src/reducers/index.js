import { combineReducers } from 'redux';
import userDetails from './userDetails';
import alexaListing from './alexaListing';
import productListing from './productListing';
import userToken from './userToken';

export default combineReducers({
  userDetails,
  userToken,
  alexaListing,
  productListing
});
