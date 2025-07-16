import { baseApi } from '../baseApis';

const serviceListingApis = baseApi.injectEndpoints({
  endpoints: builder => ({
    getServices: builder.query({
      query: ({ limit = 10, search = '', page = 1 }) => ({
        url: '/service_listing/get-all',
        method: 'GET',
        params: {
          limit,
          search,
          page,
        },
      }),
      providesTags: ['serviceListing'],
    }),
    // Get service by id
    getServiceById: builder.query({
      query: id => ({
        url: `/service_listing/get-by-id/${id}`,
        method: 'GET',
      }),
      providesTags: ['serviceListing'],
    }),
  }),
});

export const { useGetServicesQuery, useGetServiceByIdQuery } = serviceListingApis;
