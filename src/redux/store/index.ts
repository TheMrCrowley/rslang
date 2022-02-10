import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { wordsReducer } from './reducers/wordsReducer';
import { authReducer } from './reducers/authReducer';
import { requestReducer } from './reducers/requestReducer';
import rootWatcher from '../saga';
import { userWordsReducer } from './reducers/userWordsReducer';
import { sprintGameReducer } from './reducers/sprintGameReducer';
import { statisticReducer } from './reducers/statisticReducer';
import { audioCallGameReducer } from './reducers/audioCallReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  words: wordsReducer,
  request: requestReducer,
  userWords: userWordsReducer,
  sprintGame: sprintGameReducer,
  statistic: statisticReducer,
  audioCallGame: audioCallGameReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
export type RootState = ReturnType<typeof rootReducer>;
export default store;
