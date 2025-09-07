import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import rootReducer from "./reducers";

// redux-persist 설정
const persistConfig = {
  key: 'root',
  storage,
};

// persistReducer를 사용해 rootReducer를 감쌈
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 스토어 생성
const store = configureStore({
  reducer: persistedReducer, // 감싼 리듀서를 사용
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist 관련 경고를 방지
    }).concat(logger), // redux-logger 추가
});

// persistor 생성
const persistor = persistStore(store);

export { store, persistor };
