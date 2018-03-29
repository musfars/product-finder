export default function (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_PRODUCT_LIST_SUCCESS': return action.payload;
    case 'RECEIVE_PRODUCT_LIST_FAILURE': return 'ERROR';
    case 'ADD_PRODUCT_TO_LIST_SUCCESS' : return [...state].concat(action.payload);
    default: return state;
  }
}