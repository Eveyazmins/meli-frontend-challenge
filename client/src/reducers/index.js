import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import descriptionReducer from './descriptionReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  items: itemsReducer,
  description: descriptionReducer,
  loading: loadingReducer
});
