import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const configureStore = (preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, createLogger())
  );
}

export default configureStore;
