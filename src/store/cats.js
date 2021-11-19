import { createReducer } from '@reduxjs/toolkit';
import { getCatsBreeds } from '../api';
import { loadingLock } from './main';

const FETCH_BREEDS = 'FETCH_BREEDS';
const CHANGE_PAGE = 'CHANGE_PAGE';

const initialState = {
  catsBreeds: [],
  page: 0,
};

export default createReducer(initialState, {
  [FETCH_BREEDS]: (state, action) => {
    state.catsBreeds = state.catsBreeds.concat(action.breeds);
  },
  [CHANGE_PAGE]: state => {
    state.page = state.page + 1;
  },
});

export const changeCatsPage = () => ({
  type: CHANGE_PAGE,
});

export const loadCatsBreeds =
  (page = 0) =>
  dispatch => {
    dispatch(loadingLock(true));
    return getCatsBreeds({ page, limit: 6 })
      .then(breeds => {
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
