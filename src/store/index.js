import { configureStore } from '@reduxjs/toolkit';
import main from './main';
import cats from './cats';
import dogs from './dogs';

const reducer = {
  main,
  cats,
  dogs,
};

export const store = configureStore({
  reducer,
});
