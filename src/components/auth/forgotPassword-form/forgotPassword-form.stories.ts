import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from '@/components/auth/forgotPassword-form/forgotPassword-form'

const meta = {
  component: ForgotPasswordForm,
  tags: ['autodocs'],
  title: 'Auth/ForgotPassword',
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
