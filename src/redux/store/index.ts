import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { wordsReducer } from './reducers/wordsReducer';
import { authReducer } from './reducers/authReducer';
import { requestReducer } from './reducers/requestReducer';
import rootWatcher from '../saga';
import { userWordsReducer } from './reducers/userWordsReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  words: wordsReducer,
  request: requestReducer,
  userWords: userWordsReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
export type RootState = ReturnType<typeof rootReducer>;
export default store;
