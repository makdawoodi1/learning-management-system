import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import monitorReducersEnhancer from "../enhancers/monitorReducer";
import loggerMiddleware from "../middlewares/logger";
import { rootReducer } from "./reducer";


export default function configureAppStore(preloadedState) {
    const store = configureStore({
      reducer: rootReducer,
      middleware: [loggerMiddleware, ...getDefaultMiddleware()],
      preloadedState,
      enhancers: [monitorReducersEnhancer]
    })
  
    return store
  }
