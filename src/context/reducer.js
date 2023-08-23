import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./Thunk/user";

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    loading: false,
    user: null,
    token: null
  },
  reducers: {
    processing(state) {
      if (!state.loading) state.loading = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    })
  }
})

export const { processing, login } = userSlice.actions;
export default userSlice.reducer;