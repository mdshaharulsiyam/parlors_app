import { baseApi } from '../baseApis';

const vendorApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVendor: builder.mutation({
      query: (data) => ({
        url: '/business/create',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['auth', 'vendor']
    }),
    getVendor: builder.query({
      query: ({ limit = 10, search = '', page = 1, sort = '', order = '' }) => ({
        url: '/business/get-all',
        method: 'GET',
        params: {
          limit,
          search,
          page,
          sort,
          order
        }
      }),
      providesTags: ['vendor']
    })
  })

})

export const { useCreateVendorMutation, useGetVendorQuery } = vendorApis