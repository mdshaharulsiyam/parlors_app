import {baseApi} from '../baseApis';

type ApiId = string;

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'no_show'
  | 'cancelled'
  | 'late_cancellation_requested';

export interface SlotQuery {
  salon: ApiId;
  service: ApiId;
  date: string;
  worker?: ApiId;
}

export interface CreateBookingPayload {
  salon: ApiId;
  service: ApiId;
  start_at?: string;
  date?: string;
  start_time?: string;
  worker?: ApiId;
  timezone_offset?: number;
  note?: string;
  address?: string;
}

const salonV1Apis = baseApi.injectEndpoints({
  endpoints: builder => ({
    v1CustomerSignup: builder.mutation({
      query: data => ({
        url: '/api/v1/auth/customer-signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),
    v1OwnerSignup: builder.mutation({
      query: data => ({
        url: '/api/v1/auth/owner-signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth', 'salon'],
    }),
    v1Login: builder.mutation({
      query: data => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),
    v1Refresh: builder.mutation({
      query: refreshToken => ({
        url: '/api/v1/auth/refresh',
        method: 'POST',
        body: {refreshToken},
      }),
    }),
    v1Logout: builder.mutation({
      query: refreshToken => ({
        url: '/api/v1/auth/logout',
        method: 'POST',
        body: {refreshToken},
      }),
      invalidatesTags: ['auth'],
    }),
    v1LogoutAll: builder.mutation({
      query: () => ({
        url: '/api/v1/auth/logout-all',
        method: 'POST',
      }),
      invalidatesTags: ['auth'],
    }),
    v1Me: builder.query({
      query: () => ({
        url: '/api/v1/me',
        method: 'GET',
      }),
      providesTags: ['auth'],
    }),
    v1UpdateMe: builder.mutation({
      query: data => ({
        url: '/api/v1/me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),
    v1ChangePassword: builder.mutation({
      query: data => ({
        url: '/api/v1/me/password',
        method: 'PATCH',
        body: data,
      }),
    }),
    v1ListSalons: builder.query({
      query: params => ({
        url: '/api/v1/salons',
        method: 'GET',
        params,
      }),
      providesTags: ['salon'],
    }),
    v1GetSalon: builder.query({
      query: id => ({
        url: `/api/v1/salons/${id}`,
        method: 'GET',
      }),
      providesTags: ['salon', 'salonService', 'worker', 'review'],
    }),
    v1MySalons: builder.query({
      query: () => ({
        url: '/api/v1/owner/salons',
        method: 'GET',
      }),
      providesTags: ['salon'],
    }),
    v1UpdateSalon: builder.mutation({
      query: ({id, ...body}) => ({
        url: `/api/v1/salons/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['salon'],
    }),
    v1ListWorkers: builder.query({
      query: salonId => ({
        url: `/api/v1/salons/${salonId}/workers`,
        method: 'GET',
      }),
      providesTags: ['worker'],
    }),
    v1CreateWorker: builder.mutation({
      query: ({salonId, ...body}) => ({
        url: `/api/v1/salons/${salonId}/workers`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['worker'],
    }),
    v1UpdateWorker: builder.mutation({
      query: ({salonId, workerId, ...body}) => ({
        url: `/api/v1/salons/${salonId}/workers/${workerId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['worker'],
    }),
    v1ListServices: builder.query({
      query: ({salonId, includeInactive}) => ({
        url: `/api/v1/salons/${salonId}/services`,
        method: 'GET',
        params: includeInactive ? {includeInactive: 'true'} : undefined,
      }),
      providesTags: ['salonService'],
    }),
    v1CreateService: builder.mutation({
      query: ({salonId, ...body}) => ({
        url: `/api/v1/salons/${salonId}/services`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['salonService'],
    }),
    v1UpdateService: builder.mutation({
      query: ({salonId, serviceId, ...body}) => ({
        url: `/api/v1/salons/${salonId}/services/${serviceId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['salonService', 'slot'],
    }),
    v1Slots: builder.query({
      query: (params: SlotQuery) => ({
        url: '/api/v1/slots',
        method: 'GET',
        params,
      }),
      providesTags: ['slot'],
    }),
    v1CreateBooking: builder.mutation({
      query: (body: CreateBookingPayload) => ({
        url: '/api/v1/bookings',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['booking', 'slot', 'notification'],
    }),
    v1ListBookings: builder.query({
      query: params => ({
        url: '/api/v1/bookings',
        method: 'GET',
        params,
      }),
      providesTags: ['booking'],
    }),
    v1GetBooking: builder.query({
      query: id => ({
        url: `/api/v1/bookings/${id}`,
        method: 'GET',
      }),
      providesTags: ['booking'],
    }),
    v1UpdateBookingStatus: builder.mutation({
      query: ({id, status, reason}: {id: ApiId; status: BookingStatus; reason?: string}) => ({
        url: `/api/v1/bookings/${id}/status`,
        method: 'PATCH',
        body: {status, reason},
      }),
      invalidatesTags: ['booking', 'notification', 'point'],
    }),
    v1CancelBooking: builder.mutation({
      query: ({id, reason}) => ({
        url: `/api/v1/bookings/${id}/cancel`,
        method: 'POST',
        body: {reason},
      }),
      invalidatesTags: ['booking', 'slot', 'notification'],
    }),
    v1CreateReview: builder.mutation({
      query: ({bookingId, ...body}) => ({
        url: `/api/v1/bookings/${bookingId}/review`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['review', 'point', 'notification', 'salon'],
    }),
    v1ListReviews: builder.query({
      query: salonId => ({
        url: `/api/v1/salons/${salonId}/reviews`,
        method: 'GET',
      }),
      providesTags: ['review'],
    }),
    v1Notifications: builder.query({
      query: () => ({
        url: '/api/v1/notifications',
        method: 'GET',
      }),
      providesTags: ['notification'],
    }),
    v1ReadNotification: builder.mutation({
      query: id => ({
        url: `/api/v1/notifications/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['notification'],
    }),
    v1Points: builder.query({
      query: () => ({
        url: '/api/v1/points',
        method: 'GET',
      }),
      providesTags: ['point'],
    }),
    v1CreateDispute: builder.mutation({
      query: ({bookingId, ...body}) => ({
        url: `/api/v1/bookings/${bookingId}/disputes`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['dispute'],
    }),
    v1Disputes: builder.query({
      query: params => ({
        url: '/api/v1/disputes',
        method: 'GET',
        params,
      }),
      providesTags: ['dispute'],
    }),
    v1AdminUsers: builder.query({
      query: params => ({
        url: '/api/v1/admin/users',
        method: 'GET',
        params,
      }),
      providesTags: ['admin'],
    }),
    v1AdminSuspendUser: builder.mutation({
      query: ({id, ...body}) => ({
        url: `/api/v1/admin/users/${id}/suspend`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['admin'],
    }),
    v1AdminPendingSalons: builder.query({
      query: () => ({
        url: '/api/v1/admin/salons/pending',
        method: 'GET',
      }),
      providesTags: ['admin', 'salon'],
    }),
    v1AdminApproveSalon: builder.mutation({
      query: ({id, ...body}) => ({
        url: `/api/v1/admin/salons/${id}/approval`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['admin', 'salon'],
    }),
    v1AdminReviewLateCancellation: builder.mutation({
      query: ({id, ...body}) => ({
        url: `/api/v1/admin/bookings/${id}/late-cancellation`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['admin', 'booking', 'slot'],
    }),
    v1AdminUpdateSettings: builder.mutation({
      query: body => ({
        url: '/api/v1/admin/settings',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['admin'],
    }),
    v1AdminResolveDispute: builder.mutation({
      query: ({id, ...body}) => ({
        url: `/api/v1/admin/disputes/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['admin', 'dispute'],
    }),
    v1SeedDemo: builder.mutation({
      query: () => ({
        url: '/api/v1/admin/seed-demo',
        method: 'POST',
      }),
      invalidatesTags: [
        'auth',
        'salon',
        'salonService',
        'worker',
        'booking',
        'admin',
      ],
    }),
  }),
});

export const {
  useV1CustomerSignupMutation,
  useV1OwnerSignupMutation,
  useV1LoginMutation,
  useV1RefreshMutation,
  useV1LogoutMutation,
  useV1LogoutAllMutation,
  useV1MeQuery,
  useV1UpdateMeMutation,
  useV1ChangePasswordMutation,
  useV1ListSalonsQuery,
  useV1GetSalonQuery,
  useV1MySalonsQuery,
  useV1UpdateSalonMutation,
  useV1ListWorkersQuery,
  useV1CreateWorkerMutation,
  useV1UpdateWorkerMutation,
  useV1ListServicesQuery,
  useV1CreateServiceMutation,
  useV1UpdateServiceMutation,
  useV1SlotsQuery,
  useV1CreateBookingMutation,
  useV1ListBookingsQuery,
  useV1GetBookingQuery,
  useV1UpdateBookingStatusMutation,
  useV1CancelBookingMutation,
  useV1CreateReviewMutation,
  useV1ListReviewsQuery,
  useV1NotificationsQuery,
  useV1ReadNotificationMutation,
  useV1PointsQuery,
  useV1CreateDisputeMutation,
  useV1DisputesQuery,
  useV1AdminUsersQuery,
  useV1AdminSuspendUserMutation,
  useV1AdminPendingSalonsQuery,
  useV1AdminApproveSalonMutation,
  useV1AdminReviewLateCancellationMutation,
  useV1AdminUpdateSettingsMutation,
  useV1AdminResolveDisputeMutation,
  useV1SeedDemoMutation,
} = salonV1Apis;
