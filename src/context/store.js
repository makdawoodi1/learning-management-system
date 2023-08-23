import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer
 } from 'redux-persist';
import thunk from 'redux-thunk';

import monitorReducersEnhancer from "../enhancers/monitorReducer";
import loggerMiddleware from "../middlewares/logger";
import rootReducer from './reducer'

const persistConfig = {
  key: 'root',
  whitelist: ['userSlice'],
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureAppStore() {
  const store = configureStore({

    middleware: (getDefaultMiddleware) => {
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }
  });

  return store;
}
