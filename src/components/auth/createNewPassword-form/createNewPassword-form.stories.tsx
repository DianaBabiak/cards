import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordForm } from '@/components/auth/createNewPassword-form/createNewPassword-form'

const meta = {
  argTypes: {},
  component: CreateNewPasswordForm,
  tags: ['autodocs'],
  title: 'Components/CreateNewPasswordForm',
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
