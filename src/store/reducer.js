import { createReducer } from '@reduxjs/toolkit';
import { getBreeds, getImages, loadImage } from '../api';

const FETCH_BREEDS = 'FETCH_BREEDS';
const FETCH_IMAGES = 'FETCH_IMAGES';
const LOADING = 'LOADING';
const SET_BREED_ID = 'SET_BREED_ID';
const FETCH_SELECTED_BREED = 'FETCH_SELECTED_BREED';
const CLEAR_STATE = 'CLEAR_STATE';

const initialState = {
  breeds: [],
  selectedBreed: [],
  breedId: '',
  images: [],
  loading: false,
};

export default createReducer(initialState, {
  [FETCH_BREEDS]: (state, action) => {
    state.breeds = action.breeds;
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
  [LOADING]: (state, action) => {
    state.loading = action.loading;
  },
  [CLEAR_STATE]: state => {
    state = initialState;
  },
});

export const loadingLock = loading => ({
  type: LOADING,
  loading,
});

export const setBreedId = breedId => ({
  type: SET_BREED_ID,
  breedId: breedId,
});

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const fetchSelectedBreed = breedId => dispatch => {
  dispatch(loadingLock(true));
  loadImage(breedId).then(selectedBreed => {
    if (selectedBreed) {
      dispatch({
        type: FETCH_SELECTED_BREED,
        selectedBreed,
      });
      dispatch(loadingLock(false));
    }
  });
};

export const loadBreeds = () => dispatch => {
  dispatch(loadingLock(true));
  return getBreeds()
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

export const loadImages =
  (breed, page = 0) =>
  dispatch => {
    dispatch(loadingLock(true));
    return getImages(breed, page)
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
