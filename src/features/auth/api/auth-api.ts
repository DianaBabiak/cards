import {
  LoginArgs,
  RecoveryEmailArgs,
  ResetPasswordArgs,
  ResponseLogin,
  SignUpArgs,
  UpdateUserDataArg,
  User,
} from '@/features/auth/api/auth-api.types'
import { baseApi } from '@/services/base-api'

function buildAuthFormData(body: UpdateUserDataArg) {
  const formData = new FormData()

  if (body.name) {
    formData.append('name', body.name)
  }
  if (body.avatar) {
    formData.append('avatar', body.avatar)
  }

  return formData
}
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
    logout: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: 'v1/auth/logout',
      }),
    }),
    me: builder.query<User, void>({
      providesTags: ['Me'],
      query: () => '/v1/auth/me',
    }),
    resetPassword: builder.mutation<void, ResetPasswordArgs>({
      query: ({ token, ...body }) => ({
        body,
        method: 'POST',
        url: `v1/auth/reset-password/${token}`,
      }),
    }),
    sendRecoveryEmail: builder.mutation<void, RecoveryEmailArgs>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/recover-password',
      }),
    }),
    signUp: builder.mutation<User, SignUpArgs>({
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/sign-up',
      }),
    }),
    updateUserData: builder.mutation<User, UpdateUserDataArg>({
      query: body => ({
        body: buildAuthFormData(body),
        formData: buildAuthFormData(body),
        method: 'PATCH',
        url: '/v1/auth/me',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useResetPasswordMutation,
  useSendRecoveryEmailMutation,
  useSignUpMutation,
  useUpdateUserDataMutation,
} = authApi
