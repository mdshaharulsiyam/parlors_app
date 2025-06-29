import { parlorsApi } from '../baseApis';

const addressApis = parlorsApi.injectEndpoints({
  endpoints: (builder) => ({
    getDivisions: builder.query({
      query: ({ page = 1 }) => ({
        url: '/divisions/get-all',
        method: 'GET',
        params: {
          page
        }
      }),
    }),
    getDistricts: builder.query({
      query: ({ division_id, page = 1 }) => ({
        url: '/districts/get-all',
        method: 'GET',
        params: {
          division_id,
          page
        }
      }),
    }),
    getUpazilas: builder.query({
      query: ({ district_id, page = 1 }) => ({
        url: '/upazilas/get-all',
        method: 'GET',
        params: {
          district_id,
          page
        }
      }),
    }),
    getUnions: builder.query({
      query: ({ upazilla_id, page = 1 }) => ({
        url: '/union/get-all',
        method: 'GET',
        params: {
          upazilla_id,
          page
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