import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../config/config'

export const userAPI = createApi({
    tagTypes: ['User'],
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        login: builder.query({
            query: () => '/auth/login'
        })
    })
})

export const { useLoginQuery } = userAPI;