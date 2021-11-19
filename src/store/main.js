import { createReducer } from '@reduxjs/toolkit';

const LOADING = 'LOADING';

const initialState = {
  loading: false,
};

export default createReducer(initialState, {
  [LOADING]: (state, action) => {
    state.loading = action.loading;
  },
});

export const loadingLock = loading => ({
  type: LOADING,
  loading,
});
