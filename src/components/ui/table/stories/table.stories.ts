import type { Meta, StoryObj } from '@storybook/react'

import { TableStory } from '@/components/ui/table/stories/tableStory'

const meta = {
  argTypes: {},
  component: TableStory,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof TableStory>

export default meta
type Story = StoryObj<typeof meta>

export const TableDemo: Story = {}
