import { baseApi } from '../baseApis';

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ limit = 10, search, page = 1 }) => {
        return {
          url: '/category/get-all',
          method: 'GET',
          params: {
            limit,
            search,
            page,
          }
        }
      },
    }),
  }),
})

export const { useGetCategoriesQuery } = categoryApi
