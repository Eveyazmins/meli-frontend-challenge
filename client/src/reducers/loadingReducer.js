import { LOADING } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case LOADING:
      return action.payload;
    default:
      return state;
  }
};
