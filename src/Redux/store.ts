import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { parlorsApi } from './baseApis'
import { userSlice } from './States/userSlice'

export const store = configureStore({
  reducer: {
    [parlorsApi.reducerPath]: parlorsApi.reducer,
    user: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(parlorsApi.middleware),
})
setupListeners(store.dispatch)