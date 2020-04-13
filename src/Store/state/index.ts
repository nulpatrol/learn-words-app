import rootReducer from '../combine-reducers';

export type AppState = ReturnType<typeof rootReducer>;

export * from './languages';
