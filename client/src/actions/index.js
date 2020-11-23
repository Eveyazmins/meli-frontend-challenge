import axios from 'axios';
import { FETCH_ITEMS, FETCH_DESCRIPTION, LOADING } from './types';

export const fetchItems = query => async dispatch => {
  try {
    dispatch({ type: LOADING, payload: true });
    const res = await axios.get(`/api/items?q=${query}`);
    dispatch({ type: FETCH_ITEMS, payload: res.data });
    dispatch({ type: LOADING, payload: false });
  } catch (e) {
    dispatch({ type: LOADING, payload: true });
    dispatch({
      type: FETCH_ITEMS,
      payload: { categories: [], items: [] }
    });
    dispatch({ type: LOADING, payload: false });
  }
};

export const fetchItemDescription = item => async dispatch => {
  try {
    dispatch({ type: LOADING, payload: true });
    const res = await axios.get(`/api/items/${item}`);
    dispatch({ type: FETCH_DESCRIPTION, payload: res.data });
    dispatch({ type: LOADING, payload: false });
  } catch (e) {
    dispatch({ type: LOADING, payload: true });
    dispatch({
      type: FETCH_DESCRIPTION,
      payload: { item: '' }
    });
    dispatch({ type: LOADING, payload: false });
  }
};

