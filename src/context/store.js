// Redux Imports
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// Middleware Imports
import monitorReducersEnhancer from "../enhancers/monitorReducer";
import loggerMiddleware from "../middlewares/logger";

// Reducers & Slices imports
import rootReducer from "./reducer";
import { RESET_STATE_ACTION_TYPE } from "./actions/resetState";
import { authReducer, authSlice } from "../features/auth/slice";

// API imports
import { AUTH_API_REDUCER_KEY, authApi } from "../api/auth/api";
import { unauthenticatedMiddleware } from "./middleware/UnauthenticatedMiddleware";

// Combining Reducers into RootReducer
const reducers = {
  [authSlice.name]: authReducer,
  [AUTH_API_REDUCER_KEY]: authApi.reducer,
};
const combinedReducer = combineReducers(reducers);
export const rootReducer = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {};
  }

  return combinedReducer(state);
};

// Configure Application Store
export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaulMiddleware) =>
      getDefaulMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([
        unauthenticatedMiddleware,
        authApi.middleware,
      ]),
  });

  return store;
}

export const useRootDispatch = () => useDispatch();
export const useRootSelector = () => useSelector();