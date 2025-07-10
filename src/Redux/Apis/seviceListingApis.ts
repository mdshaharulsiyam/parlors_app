import { baseApi } from '../baseApis';

const serviceListingApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: ({ limit = 10, search = '', page = 1 }) => ({
        url: '/service_listing/get-all',
        method: 'GET',
        params: {
          limit,
          search,
          page,
        }
      }),
      providesTags: ['serviceListing']
    })
  })
})

export const { useGetServicesQuery } = serviceListingApis
