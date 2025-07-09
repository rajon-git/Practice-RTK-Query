// api/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/v1/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: 'register/',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: 'verify-otp/',
        method: 'POST',
        body: otpData,
      }),
    }),
    resendOtp: builder.mutation({
      query: (email) => ({
        url: 'resend-otp/',
        method: 'POST',
        body: { email },
      }),
    }),
    activateAccount: builder.query({
      query: ({ uidb64, token }) => ({
        url: `activate/${uidb64}/${token}/`,
        method: 'GET',
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: 'refresh/',
        method: 'POST',
        body: { refresh: refreshToken },
      }),
    }),
    

  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useActivateAccountQuery,
  useRefreshTokenMutation
} = authApi;