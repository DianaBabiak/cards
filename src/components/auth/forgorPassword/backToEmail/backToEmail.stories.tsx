import type { Meta, StoryObj } from '@storybook/react'

import { BackToEmail } from '@/components/auth/forgorPassword/backToEmail/backToEmail'

const meta = {
  argTypes: {},
  component: BackToEmail,
  tags: ['autodocs'],
  title: 'Components/ForgotPassword/BackToEmail',
} satisfies Meta<typeof BackToEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
