import { FETCH_ITEMS } from '../actions/types';

/*const initialState = {
    author: {
      name: "Evelin Yazmin",
      lastname: "Santamaria"
    },
    categories: [],
    items: [{}]

};
*/

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload;
      
    default:
      return state;
  }
};

