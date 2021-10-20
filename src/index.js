// eslint-disable-next-line import/no-unresolved
import '@/theme/app-styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);
