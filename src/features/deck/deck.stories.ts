import type { Meta, StoryObj } from '@storybook/react'

import { Deck } from '@/features/deck/Deck'

const meta = {
  component: Deck,
  tags: ['autodocs'],
  title: 'features/Deck',
} satisfies Meta<typeof Deck>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
