import type { Meta, StoryObj } from '@storybook/react'

import { CreationCard } from '@/features/creationEditionEntity/create/creationCard/CreationCard'

const meta = {
  argTypes: {},
  component: CreationCard,
  tags: ['autodocs'],
  title: 'features/creationEntity/creationCard',
} satisfies Meta<typeof CreationCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
    setIsOpen: () => {},
  },
}
