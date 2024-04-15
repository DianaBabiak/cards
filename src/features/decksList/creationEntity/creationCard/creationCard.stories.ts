import type { Meta, StoryObj } from '@storybook/react'

import defaultImg from '@/assets/imgReact.png'
import { CreationCard } from '@/features/decksList/creationEntity/creationCard/CreationCard'

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
    defaultImage: defaultImg,
    isOpen: true,
    setIsOpen: () => {},
  },
}
