import { combineReducers } from 'redux';
import userDetails from './userDetails';
import alexaListing from './alexaListing';
import productListing from './productListing';

export default combineReducers({
  userDetails,
  alexaListing,
  productListing
});
