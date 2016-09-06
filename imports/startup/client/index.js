/* global window */

import { render } from 'react-dom';

import renderRoutes from './routes';
// import './register_api';

// Make sure prerendering doesn't fire yet
window.prerenderReady = false;

render(renderRoutes(), document.getElementById('app'));
