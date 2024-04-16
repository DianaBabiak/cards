import type { Meta, StoryObj } from '@storybook/react'

import { CreationDeck } from '@/features/creationEntity/creationDeck/CreationDeck'

const meta = {
  argTypes: {},
  component: CreationDeck,
  tags: ['autodocs'],
  title: 'features/creationEntity/creationDeck',
} satisfies Meta<typeof CreationDeck>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
    setIsOpen: () => {},
  },
}
