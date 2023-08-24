import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../config/config";

export const AUTH_API_REDUCER_KEY = "authApi";
export const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/auth`,
  }),
  endpoints: (builder) => ({
    // Login User
    login: builder.query({
      query: (data) => {
        return {
          url: "login",
          method: "POST",
          mode: 'cors',
          body: JSON.stringify({
            
          })
        };
      },
    }),

    // Register User
    register: builder.query({
      query: (code) => {
        return {
          url: "login",
          method: "POST",
          code,
        };
      },
    }),
  }),
});