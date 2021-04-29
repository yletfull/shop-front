import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import upload from './upload';

const rootReducer = combineReducers({
  [auth.NS]: auth.reducer,
  [upload.NS]: upload.reducer,
});

export const configureStore = function configureStore() {
  const middleware = process.env.NODE_ENV === 'development'
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(thunk);

  return createStore(
    rootReducer,
    middleware,
  );
};

export default configureStore();
