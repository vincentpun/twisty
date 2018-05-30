import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';

export const createReduxStore = (initialState?: any) => {
  const isBrowser = typeof window === 'object';
  const devToolsExtension: StoreEnhancer = isBrowser &&
    ((window as any)['devToolsExtension'] ? (window as any)['devToolsExtension']() : f => f);

  const middlewares = [thunkMiddleware];

  const enhancers = [
    applyMiddleware(...middlewares),
    devToolsExtension,
  ].filter(Boolean);

  return createStore(
    reducer,
    initialState,
    compose(...enhancers),
  );
};
