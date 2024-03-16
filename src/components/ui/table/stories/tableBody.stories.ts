import type { Meta, StoryObj } from '@storybook/react'

import { TableBodyStory } from '@/components/ui/table/stories/tableBodyStory'

const meta = {
  argTypes: {},
  component: TableBodyStory,
  tags: ['autodocs'],
  title: 'Components/Table/Body',
} satisfies Meta<typeof TableBodyStory>

export default meta
type Story = StoryObj<typeof meta>

export const TableBody: Story = {}
