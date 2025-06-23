import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = 'http://10.0.60.189:5004/'
export const generateImageUrl = (imagePath: string): string => imagePath?.includes('http') ? imagePath : imagePath?.startsWith('/') ? `${baseUrl}${imagePath}` : `${baseUrl}/${imagePath}`;
export const parlorsApi = createApi({
  reducerPath: 'parlorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: async (headers, { getState }) => {
      const token = (getState() as any)?.user?.token;
      if (!headers.has('Authorization')) {
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
      }
      return headers
    },
  }),
  endpoints: (build) => ({}),
  tagTypes: ['auth']
})

