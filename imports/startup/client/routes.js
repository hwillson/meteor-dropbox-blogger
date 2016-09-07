/* global localStorage */

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import DefaultLayout from '../../ui/client/layouts/DefaultLayout';

if (!localStorage.getItem('paxil_language')) {
  localStorage.setItem('paxil_language', 'en');
}

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={DefaultLayout} />
    <Route path="/:slug" component={DefaultLayout} />
  </Router>
);

export default renderRoutes;
