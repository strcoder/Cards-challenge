import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './context';
import App from './routes/App';
import './sass/index.scss';

const preloadedState = window.__PRELOADED_STATE__;
const app = document.getElementById('app');
const state = document.getElementById('preloadedState');
delete window.__PRELOADED_STATE__;
if (state) {
  document.body.removeChild(state);
}

ReactDOM.render(
  <Provider initialState={preloadedState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  app,
);
