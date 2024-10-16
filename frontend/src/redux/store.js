import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

// redux-persist 설정
const persistConfig = {
  key: 'root',
  storage,
};

// persistReducer를 사용해 rootReducer를 감쌈
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 스토어 생성
const store = createStore(persistedReducer, applyMiddleware(thunk, logger));

// persistor 생성
const persistor = persistStore(store);

export { store, persistor };
