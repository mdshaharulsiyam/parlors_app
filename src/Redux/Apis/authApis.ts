import { parlorsApi } from "../baseApis"

// auth / profile
const auth_apis = parlorsApi.injectEndpoints({
  endpoints: (builder) => ({
    get_profile: builder.query({
      query: () => ({
        url: `auth/profile`,
        method: 'GET'
      }),
      providesTags: ['auth']
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/sign-in`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ['auth']
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/auth/sign-up`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ['auth']
    }),
    verify_otp: builder.mutation({
      query: (data) => ({
        url: `/verification/verify`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ['auth']
    }),
    reset: builder.mutation({
      query: ({ data, token }) => ({
        url: `/auth/reset-password`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      }),
      invalidatesTags: ['auth']
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `/auth/update-profile`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ['auth']
    }),
    change_password: builder.mutation({
      query: (data) => ({
        url: `auth/change-password`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ['auth']
    }),
    forget: builder.mutation({
      query: (data) => ({
        url: `verification/create`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ['auth']
    }),
  })
})
export const {
  useGet_profileQuery,
  useRegisterMutation,
  useLoginMutation,
  useVerify_otpMutation,
  useChange_passwordMutation,
  useResetMutation,
  useUpdateMutation,
  useForgetMutation

} = auth_apis