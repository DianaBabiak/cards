import type { Meta, StoryObj } from '@storybook/react'

import { TableHeadStory } from '@/components/ui/table/stories/tableHeadStory'

const meta = {
  argTypes: {},
  component: TableHeadStory,
  tags: ['autodocs'],
  title: 'Components/Table/Head',
} satisfies Meta<typeof TableHeadStory>

export default meta
type Story = StoryObj<typeof meta>

export const TableHead: Story = {}
