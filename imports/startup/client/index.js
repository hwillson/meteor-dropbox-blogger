/* global document, window */

import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import renderRoutes from './routes';
// import './register_api';

// Make sure prerendering doesn't fire yet
window.prerenderReady = false;

document.getElementById('head-title').innerHTML =
  Meteor.settings.public.site.title;
render(renderRoutes(), document.getElementById('app'));
