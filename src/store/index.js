import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import upload from './upload';
import users from './users';
import ui from './ui';

const rootReducer = combineReducers({
  [auth.NS]: auth.reducer,
  [upload.NS]: upload.reducer,
  [users.NS]: users.reducer,
  [ui.NS]: ui.reducer,
});

export const configureStore = function configureStore() {
  const middleware = process.env.NODE_ENV === 'development'
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(thunk);

  return createStore(
    rootReducer,
    composeWithDevTools(middleware),
  );
};

export default configureStore();
