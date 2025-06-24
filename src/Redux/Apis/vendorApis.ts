import { parlorsApi } from '../baseApis';

const vendorApis = parlorsApi.injectEndpoints({
  endpoints: (builder) => ({
    createVendor: builder.mutation({
      query: (data) => ({
        url: '/business/create',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['auth', 'vendor']
    })
  })

})

export const { useCreateVendorMutation } = vendorApis