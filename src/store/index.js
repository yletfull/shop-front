import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import auth from './auth';
import upload from './upload';

const rootReducer = combineReducers({
  [auth.NS]: auth.reducer,
  [upload.NS]: upload.reducer,
});

export const configureStore = function configureStore() {
  const middleware = applyMiddleware(thunk);

  return createStore(
    rootReducer,
    composeWithDevTools(middleware),
  );
};

export default configureStore();
