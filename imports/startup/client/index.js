/* global document */

import { render } from 'react-dom';

import renderRoutes from './routes';
// import './register_api';

render(renderRoutes(), document.getElementById('app'));
