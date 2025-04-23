import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const parlorsApi = createApi({
    reducerPath: 'parlorsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pokeapi.co/api/v2/',
        headers: {

        }
    }),
    endpoints: (build) => ({}),
    tagTypes: ['auth']
})

