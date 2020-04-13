import { applyMiddleware, compose, createStore, Middleware, Store, StoreEnhancer } from 'redux';

const middlewares: Middleware[] = [];

import rootReducer from './combine-reducers';
import { AppState } from './state';

const enhancer: StoreEnhancer = compose(applyMiddleware(...middlewares));

export default function configureStore() {
  const store: Store<AppState> = createStore(rootReducer, enhancer);
  return store;
}
