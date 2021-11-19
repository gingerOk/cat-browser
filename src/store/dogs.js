import { createReducer } from '@reduxjs/toolkit';
import { getDogsBreeds } from '../api';
import { loadingLock } from './main';

const FETCH_BREEDS = 'FETCH_BREEDS';
const CHANGE_PAGE = 'CHANGE_PAGE';

const initialState = {
  dogsBreeds: [],
  page: 0,
};

export default createReducer(initialState, {
  [FETCH_BREEDS]: (state, action) => {
    state.dogsBreeds = state.dogsBreeds.concat(action.breeds);
  },
  [CHANGE_PAGE]: state => {
    state.page = state.page + 1;
  },
});

export const changeDogsPage = () => ({
  type: CHANGE_PAGE,
});

export const loadDogsBreeds =
  (page = 0) =>
  async dispatch => {
    dispatch(loadingLock(true));
    return getDogsBreeds({ page, limit: 6 })
      .then(breeds => {
        console.log(breeds);
        if (breeds) {
          dispatch({
            type: FETCH_BREEDS,
            breeds,
          });
          dispatch(loadingLock(false));
        }
      })
      .catch(e => dispatch(loadingLock(false)));
  };
