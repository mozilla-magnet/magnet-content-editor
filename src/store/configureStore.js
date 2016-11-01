import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

const configureStore = (history, preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(routerMiddleware(history), thunk, createLogger())
  );
}

export default configureStore;
