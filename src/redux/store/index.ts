import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { wordsReducer } from './reducers/wordsReducer';
import { authReducer } from './reducers/authReducer';
import { requestReducer } from './reducers/requestReducer';
import authWatcher from '../saga/authSaga';
import wordsWatcher from '../saga/wordsSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  words: wordsReducer,
  request: requestReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(authWatcher);
sagaMiddleware.run(wordsWatcher);
export type RootState = ReturnType<typeof rootReducer>;
export default store;
