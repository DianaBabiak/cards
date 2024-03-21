import type { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/features/header/Header'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'features/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'j&johnson@gmail.com',
    isInitialization: false,
    name: 'Ivan',
  },
}

export const WithInitialization: Story = {
  args: {
    email: 'j&johnson@gmail.com',
    isInitialization: true,
    name: 'Ivan',
  },
}
