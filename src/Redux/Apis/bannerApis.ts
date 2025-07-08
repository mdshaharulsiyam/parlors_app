import { baseApi } from '../baseApis';

const banner_apis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    get_banners: builder.query({
      query: () => ({
        url: `banner/get-all`,
        method: 'GET'
      }),
      providesTags: ['banner']
    }),
  })
})
export const { useGet_bannersQuery } = banner_apis
