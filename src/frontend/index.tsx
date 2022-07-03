import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './routes/App';
import { Provider } from './context';
import { ContextInterface } from './utils/interface/Context';
import './sass/index.scss';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __PRELOADED_STATE__: ContextInterface;
  }
}

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
