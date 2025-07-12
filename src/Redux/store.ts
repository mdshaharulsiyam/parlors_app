import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {baseApi} from './baseApis';
import {filtersSlice} from './States/Filters';
import {userSlice} from './States/userSlice';
import {vendorSlice} from './States/vendorSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    user: userSlice.reducer,
    vendor: vendorSlice.reducer,
    filters: filtersSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
setupListeners(store.dispatch);
