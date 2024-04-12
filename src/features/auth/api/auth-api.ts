import { LoginArgs, ResponseLogin, SignUpArgs, User } from '@/features/auth/api/auth-api.types'
import { baseApi } from '@/services/base-api'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ResponseLogin, LoginArgs>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/login',
      }),
    }),
    me: builder.query<User, void>({
      providesTags: ['Me'],
      query: () => '/v1/auth/me',
    }),
    signUp: builder.mutation<User, SignUpArgs>({
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/sign-up',
      }),
    }),
  }),
})

export const { useLoginMutation, useMeQuery, useSignUpMutation } = authApi
