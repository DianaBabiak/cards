import type { Meta, StoryObj } from '@storybook/react'

import { CreateLoginForm } from '@/components/auth/login/createLoginForm/CreateLoginForm'

const meta = {
  component: CreateLoginForm,
  tags: ['autodocs'],
  title: 'Auth/CreateLoginForm',
} satisfies Meta<typeof CreateLoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
