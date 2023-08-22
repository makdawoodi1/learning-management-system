import { createReducer } from "@reduxjs/toolkit";
import types from "./types";
const { LOGIN_ACTION } = types;

const rootReducer = createReducer([], (builder) => {
  builder
    .addCase(LOGIN_ACTION, (state, action) => {
      const rootState = state[action.payload.index];
      rootState.token = action.payload.token
      rootState.user = action.payload.user
    })
});
