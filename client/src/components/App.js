import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Spinner from './ui/Spinner';

const ItemsSearch = lazy(() => import('./search/ItemsSearch'));
const ItemsList = lazy(() => import('./items/list/List'));
const ItemDescription = lazy(() => import('./items/description/Description'));
const NotFoundPage = lazy(() => import('./ui/NotFoundPage'));

const App = () => {
    return (
        <BrowserRouter>
        <div className="app">
          <div className="row">
            <Suspense fallback={ <Spinner className="spinner-ui-suspense" /> }>
              <Switch>
                <Route exact path="/" component={ ItemsSearch } />
                <Route exact path="/items" component={ ItemsList } />
                <Route exact path="/items/:id" component={ ItemDescription } />
                <Route component={ NotFoundPage } />
              </Switch>
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
    )
}

export default App;