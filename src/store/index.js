import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import upload from './upload';
import ui from './ui';

const createRootReducer = (asyncReducers = {}) => combineReducers({
  [auth.NS]: auth.reducer,
  [upload.NS]: upload.reducer,
  [ui.NS]: ui.reducer,
  ...asyncReducers,
});

const configureStore = function configureStore() {
  const middleware = process.env.NODE_ENV === 'development'
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(thunk);

  const store = createStore(
    createRootReducer(),
    composeWithDevTools(middleware),
  );

  store.asyncReducers = {};
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createRootReducer(store.asyncReducers));
  };

  return store;
};

const store = configureStore();
export const { injectReducer } = store;
export default store;
