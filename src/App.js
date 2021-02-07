import React, {lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom' 
import SpinnerCircle from './components/Spinner'

const Homepage = lazy(() => import('./pages/Homepage'))
const CatPage = lazy(() => import('./pages/CatPage'))

export default function App() {
  return (
    <Suspense fallback={<SpinnerCircle />}>
        <Switch>
            <Route exact path="/">
                <Homepage/>
            </Route>
            <Route path="/:id">
                <CatPage />
            </Route>
        </Switch>
    </Suspense>
  );
}
