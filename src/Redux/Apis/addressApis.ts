import { parlorsApi } from '../baseApis';

const addressApis = parlorsApi.injectEndpoints({
  endpoints: (builder) => ({
    getDivisions: builder.query({
      query: ({ page = 1, limit = 10, search }) => ({
        url: '/divisions/get-all',
        method: 'GET',
        params: {
          page,
          limit,
          search
        }
      }),
    }),
    getDistricts: builder.query({
      query: ({ division_id, page = 1, limit = 10, search }) => ({
        url: '/districts/get-all',
        method: 'GET',
        params: {
          division_id,
          page,
          limit,
          search
        }
      }),
    }),
    getUpazilas: builder.query({
      query: ({ district_id, page = 1, limit = 10, search }) => ({
        url: '/upazilas/get-all',
        method: 'GET',
        params: {
          district_id,
          page,
          limit,
          search
        }
      }),
    }),
    getUnions: builder.query({
      query: ({ upazilla_id, page = 1, limit = 10, search }) => ({
        url: '/union/get-all',
        method: 'GET',
        params: {
          upazilla_id,
          page,
          limit,
          search
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