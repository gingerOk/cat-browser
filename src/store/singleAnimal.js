import { createReducer } from '@reduxjs/toolkit';
import { CATS, DOGS } from '../constants/constants';
import { getCatsBreedsById, getDogsBreedsById } from '../api';
import { loadingLock } from './main';

const FETCH_SINGLE_BREED = 'FETCH_SINGLE_BREED';
const CLEAR_STATE = 'CLEAR_STATE';

const initialState = {
  singleAnimal: null,
};

export default createReducer(initialState, {
  [FETCH_SINGLE_BREED]: (state, action) => {
    state.singleAnimal = action.singleAnimal;
  },
  [CLEAR_STATE]: () => initialState,
});

export const clearSingleAnimalState = () => ({
  type: CLEAR_STATE,
});

export const fetchSingleBreedCat = id => async dispatch => {
  dispatch(loadingLock(true));
  return getCatsBreedsById(id)
    .then(res => {
      dispatch({
        type: FETCH_SINGLE_BREED,
        singleAnimal: {
          breed: res[0].breeds[0],
          images: [...res].map(i => i.url),
        },
      });
    })
    .catch(err => {})
    .finally(function () {
      dispatch(loadingLock(false));
    });
};

export const fetchSingleBreedDog = id => dispatch => {
  dispatch(loadingLock(true));
  return getDogsBreedsById(id)
    .then(res => {
      dispatch({
        type: FETCH_SINGLE_BREED,
        singleAnimal: {
          breed: res[0].breeds[0],
          images: [...res].map(i => i.url),
        },
      });
    })
    .catch(err => {})
    .finally(function () {
      dispatch(loadingLock(false));
    });
};

export const fetchAnimalData = (type, id, dispatch) => {
  if (type === CATS) dispatch(fetchSingleBreedCat(id));
  if (type === DOGS) dispatch(fetchSingleBreedDog(id));
};
