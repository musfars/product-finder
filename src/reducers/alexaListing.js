export default function (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_ALEXA_LIST_SUCCESS': return action.payload;
    case 'RECEIVE_ALEXA_LIST_FAILURE': return 'ERROR';
    default: return state;
  }
}