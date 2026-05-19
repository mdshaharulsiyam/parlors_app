import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';

const getDevServerHost = () => {
  const hostUri = Constants.expoConfig?.hostUri;
  const host = hostUri?.split(':')[0];
  return host || 'localhost';
};

export const baseUrl =
  (globalThis as any)?.process?.env?.EXPO_PUBLIC_API_URL ||
  `http://${getDevServerHost()}:5004`;

export const generateImageUrl = (imagePath: string): string =>
  imagePath?.includes('http')
    ? imagePath
    : imagePath?.startsWith('/')
    ? `${baseUrl}${imagePath}`
    : `${baseUrl}/${imagePath}`;
// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: baseUrl,
//     prepareHeaders: async (headers, { getState }) => {
//       const token = (getState() as any)?.user?.token;
//       if (!headers.has('Authorization')) {
//         if (token) {
//           headers.set('Authorization', `Bearer ${token}`)
//         }
//       }
//       return headers
//     },
//   }),
//   endpoints: (build) => ({}),
//   tagTypes: ['auth', 'vendor']
// })

const timeoutFetchBaseQuery = (
  {baseUrl}: {baseUrl: string},
  timeout: number = 5000,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers, {getState}) => {
      const token = (getState() as any)?.user?.token;
      if (!headers.has('Authorization') && token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const result = await baseQuery(
      typeof args === 'string' ? args : {...args, signal: controller.signal},
      api,
      extraOptions,
    );

    clearTimeout(timeoutId);
    return result;
  };
};
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: timeoutFetchBaseQuery({baseUrl: baseUrl}, 5000),
  endpoints: _builder => ({}),
  tagTypes: [
    'auth',
    'vendor',
    'banner',
    'serviceListing',
    'salon',
    'salonService',
    'worker',
    'slot',
    'booking',
    'notification',
    'point',
    'review',
    'dispute',
    'admin',
  ],
});
