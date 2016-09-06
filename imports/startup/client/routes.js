/* global localStorage */

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import DefaultContainer from '../../ui/client/containers/DefaultContainer';

if (!localStorage.getItem('paxil_language')) {
  localStorage.setItem('paxil_language', 'en');
}

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={DefaultContainer} />
    <Route path="/:slug" component={DefaultContainer} />
  </Router>
);

export default renderRoutes;
