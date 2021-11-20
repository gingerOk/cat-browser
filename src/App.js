import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import SpinnerCircle from './components/Spinner/Spinner';
import { ROUTE_CATS_PAGE, ROUTE_DOGS_PAGE, ROUTE_HOME } from './constants/constants';
import SingleAnimal from './pages/SingleAnimal/SingleAnimal';

const Home = lazy(() => import('./pages/Home/Home'));
const Cats = lazy(() => import('./pages/Cats/Cats'));
const Dogs = lazy(() => import('./pages/Dogs/Dogs'));

export default function App() {
  return (
    <Suspense fallback={<SpinnerCircle />}>
      <Header />
      <Switch>
        <Route exact path={ROUTE_HOME} component={Home} />
        <Route exact path={ROUTE_CATS_PAGE} component={Cats} />
        <Route exact path={ROUTE_DOGS_PAGE} component={Dogs} />
        <Route path={`${ROUTE_CATS_PAGE}/:id`} component={SingleAnimal} />
        <Route path={`${ROUTE_DOGS_PAGE}/:id`} component={SingleAnimal} />
      </Switch>
    </Suspense>
  );
}
