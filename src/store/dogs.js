import { createReducer } from '@reduxjs/toolkit';
import { getDogsBreeds } from '../api';
import { loadingLock } from './main';

const DOGS_FETCH_BREEDS = 'DOGS_FETCH_BREEDS';
const DOGS_CHANGE_PAGE = 'DOGS_CHANGE_PAGE';
const DOGS_CHANGE_VALUE = 'DOGS_CHANGE_VALUE';
const DOGS_FETCH_ALL_BREEDS = 'DOGS_FETCH_ALL_BREEDS';
const DOGS_CHANGE_FETCH_BREEDS = 'DOGS_CHANGE_FETCH_BREEDS';

const initialState = {
  dogsBreeds: [],
  page: 0,
  dogsValue: '',
  allBreeds: [],
};

export default createReducer(initialState, {
  [DOGS_FETCH_BREEDS]: (state, action) => {
    state.dogsBreeds = state.dogsBreeds.concat(action.breeds);
  },
  [DOGS_CHANGE_FETCH_BREEDS]: (state, action) => {
    state.dogsBreeds = action.breeds;
  },
  [DOGS_CHANGE_PAGE]: state => {
    state.page = state.page + 1;
  },
  [DOGS_CHANGE_VALUE]: (state, action) => {
    state.dogsValue = action.value;
  },
  [DOGS_FETCH_ALL_BREEDS]: (state, action) => {
    state.allBreeds = action.breeds;
  },
});

export const changeDogsPage = () => ({
  type: DOGS_CHANGE_PAGE,
});

export const changeDogsValue = value => ({
  type: DOGS_CHANGE_VALUE,
  value,
});

export const filterDogsBreeds = (value, breeds) => dispatch => {
  dispatch(changeDogsValue(value));
  if (breeds?.length && value) {
    dispatch(loadingLock(true));
    const newArr = breeds.filter(i => i.name.toLowerCase().includes(value));
    dispatch({
      type: DOGS_CHANGE_FETCH_BREEDS,
      breeds: newArr,
    });
    dispatch(loadingLock(false));
  }
};

export const loadAllDogsBreeds = () => async dispatch => {
  return getDogsBreeds({ page: 0 })
    .then(breeds => {
      if (breeds) {
        dispatch({
          type: DOGS_FETCH_ALL_BREEDS,
          breeds,
        });
      }
    })
    .catch(e => console.error(e));
};

export const loadDogsBreeds =
  (page = 0) =>
  async dispatch => {
    dispatch(loadingLock(true));
    if (page === 0) dispatch(loadAllDogsBreeds());
    return getDogsBreeds({ page, limit: 6 })
      .then(breeds => {
        if (breeds) {
          dispatch({
            type: DOGS_FETCH_BREEDS,
            breeds,
          });
          dispatch(loadingLock(false));
        }
      })
      .catch(e => dispatch(loadingLock(false)));
  };
