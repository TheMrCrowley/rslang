import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { wordsReducer } from './reducers/wordsReducer';
import authWatcher from '../saga/authSaga';
import { authReducer } from './reducers/authReducer';
import wordsWatcher from '../saga/wordsSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  words: wordsReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(authWatcher);
sagaMiddleware.run(wordsWatcher);
export type RootState = ReturnType<typeof rootReducer>;
export default store;
