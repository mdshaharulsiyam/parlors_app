import { parlorsApi } from '../baseApis';

const addressApis = parlorsApi.injectEndpoints({
  endpoints: (builder) => ({
    getDivisions: builder.query({
      query: () => ({
        url: '/divisions/get-all',
        method: 'GET'
      }),
    }),
    getDistricts: builder.query({
      query: ({ division_id }) => ({
        url: '/districts/get-all',
        method: 'GET',
        params: {
          division_id
        }
      }),
    }),
    getUpazilas: builder.query({
      query: ({ district_id }) => ({
        url: '/upazilas/get-all',
        method: 'GET',
        params: {
          district_id
        }
      }),
    }),
    getUnions: builder.query({
      query: ({ upazilla_id }) => ({
        url: '/union/get-all',
        method: 'GET',
        params: {
          upazilla_id
        }
      }),
    })
  })
})

export const {
  useGetDivisionsQuery,
  useGetDistrictsQuery,
  useGetUpazilasQuery,
  useGetUnionsQuery
} = addressApis