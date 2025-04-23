import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { parlorsApi } from './baseApis'

export const store = configureStore({
    reducer: {
        [parlorsApi.reducerPath]: parlorsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(parlorsApi.middleware),
})
setupListeners(store.dispatch)