import React from 'react';
import { Router, Route, browserHistory, Redirect } from 'react-router';

import DefaultContainer from '../../ui/client/containers/DefaultContainer';

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="home" />
    <Route path="/:slug" component={DefaultContainer} />
  </Router>
);

export default renderRoutes;
