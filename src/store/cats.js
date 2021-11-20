import { createReducer } from '@reduxjs/toolkit';
import { getCatsBreeds } from '../api';
import { loadingLock } from './main';

const CATS_FETCH_BREEDS = 'CATS_FETCH_BREEDS';
const CATS_CHANGE_PAGE = 'CATS_CHANGE_PAGE';
const CATS_CHANGE_VALUE = 'CATS_CHANGE_VALUE';
const CATS_FETCH_ALL_BREEDS = 'CATS_FETCH_ALL_BREEDS';
const CATS_CHANGE_FETCH_BREEDS = 'CATS_CHANGE_FETCH_BREEDS';

const initialState = {
  catsBreeds: [],
  page: 0,
  catsValue: '',
  allBreeds: [],
};

export default createReducer(initialState, {
  [CATS_FETCH_BREEDS]: (state, action) => {
    state.catsBreeds = state.catsBreeds.concat(action.breeds);
  },
  [CATS_CHANGE_FETCH_BREEDS]: (state, action) => {
    state.catsBreeds = action.breeds;
  },
  [CATS_CHANGE_PAGE]: state => {
    state.page = state.page + 1;
  },
  [CATS_CHANGE_VALUE]: (state, action) => {
    state.catsValue = action.value;
  },
  [CATS_FETCH_ALL_BREEDS]: (state, action) => {
    state.allBreeds = action.breeds;
  },
});

export const changeCatsPage = () => ({
  type: CATS_CHANGE_PAGE,
});

export const changeCatsValue = value => ({
  type: CATS_CHANGE_VALUE,
  value,
});

export const filterCatsBreeds = (value, breeds) => dispatch => {
  dispatch(changeCatsValue(value));
  if (breeds?.length && value) {
    dispatch(loadingLock(true));
    const newArr = breeds.filter(i => i.name.toLowerCase().includes(value));
    dispatch({
      type: CATS_CHANGE_FETCH_BREEDS,
      breeds: newArr,
    });
    dispatch(loadingLock(false));
  }
};

export const loadAllCatsBreeds = () => async dispatch => {
  return getCatsBreeds({ page: 0 })
    .then(breeds => {
      if (breeds) {
        dispatch({
          type: CATS_FETCH_ALL_BREEDS,
          breeds,
        });
      }
    })
    .catch(e => console.error(e));
};
export const loadCatsBreeds =
  (page = 0) =>
  async dispatch => {
    dispatch(loadingLock(true));
    if (page === 0) dispatch(loadAllCatsBreeds());
    return getCatsBreeds({ page, limit: 6 })
      .then(breeds => {
        if (breeds) {
          dispatch({
            type: CATS_FETCH_BREEDS,
            breeds,
          });
          dispatch(loadingLock(false));
        }
      })
      .catch(e => dispatch(loadingLock(false)));
  };
