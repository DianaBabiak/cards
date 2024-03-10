import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './RadioGroup'

const meta = {
  argTypes: {},
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'value1',
    options: [
      {
        label: 'Label',
        value: 'value1',
      },
      {
        label: 'Label',
        value: 'value2',
      },
      {
        label: 'Label',
        value: 'value3',
      },
      {
        label: 'Label',
        value: 'value4',
      },
    ],
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'value1',
    disabled: true,
    options: [
      {
        label: 'Label',
        value: 'value1',
      },
      {
        label: 'Label',
        value: 'value2',
      },
      {
        label: 'Label',
        value: 'value3',
      },
      {
        label: 'Label',
        value: 'value4',
      },
    ],
  },
}
