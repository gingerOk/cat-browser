import { configureStore } from '@reduxjs/toolkit';
import main from './main';
import cats from './cats';
import dogs from './dogs';
import singleAnimal from './singleAnimal';

const reducer = {
  main,
  cats,
  dogs,
  singleAnimal,
};

export const store = configureStore({
  reducer,
});
