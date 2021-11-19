import { createReducer } from '@reduxjs/toolkit';
import { getCatsBreeds, getCatsImages, loadImage } from '../api';
import { loadingLock } from './main';
const FETCH_BREEDS = 'FETCH_BREEDS';
const FETCH_IMAGES = 'FETCH_IMAGES';
const SET_BREED_ID = 'SET_BREED_ID';
const FETCH_SELECTED_BREED = 'FETCH_SELECTED_BREED';
const CLEAR_STATE = 'CLEAR_STATE';

const initialState = {
  catsBreeds: [],
  selectedBreed: [],
  breedId: '',
  images: [],
};

export default createReducer(initialState, {
  [FETCH_BREEDS]: (state, action) => {
    state.catsBreeds = action.breeds;
  },
  [FETCH_IMAGES]: (state, action) => {
    state.images = action.images;
  },
  [FETCH_SELECTED_BREED]: (state, action) => {
    state.selectedBreed = action.selectedBreed;
  },
  [SET_BREED_ID]: (state, action) => {
    state.breedId = action.breedId;
  },
});

export const setBreedId = breedId => ({
  type: SET_BREED_ID,
  breedId: breedId,
});

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const loadCatsBreeds = () => dispatch => {
  dispatch(loadingLock(true));
  return getCatsBreeds()
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

export const loadCatsImages =
  (breed, page = 0) =>
  dispatch => {
    dispatch(loadingLock(true));
    return getCatsImages(breed, page)
      .then(images => {
        if (images) {
          dispatch({
            type: FETCH_IMAGES,
            images,
          });
          dispatch(loadingLock(false));
        }
      })
      .catch(e => dispatch(loadingLock(false)));
  };
