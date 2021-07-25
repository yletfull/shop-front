import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rootNodes } from './constants/dom';
import store from './store';
import App from './App';
import '@/theme/app-styles.scss';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  rootNodes.app,
);
