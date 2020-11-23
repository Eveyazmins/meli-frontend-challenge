import { FETCH_DESCRIPTION } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_DESCRIPTION:
      return action.payload;
    default:
      return state;
  }
};
