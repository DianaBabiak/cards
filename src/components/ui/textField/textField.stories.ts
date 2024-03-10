import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '@/components/ui/textField'

const meta = {
  argTypes: {
    errorMessage: {
      options: ['string'],
    },
    inputType: {
      options: ['password', 'search', 'text'],
    },
    label: {
      options: 'string',
    },
    value: {
      options: ['string'],
    },
  },
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
export const Error: Story = {
  args: {
    errorMessage: 'Error',
    inputType: 'text',
    label: 'input',
  },
}
export const Search: Story = {
  args: {
    inputType: 'search',
    label: 'input',
  },
}
