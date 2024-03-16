import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '@/components/ui/select/Select'

const meta = {
  argTypes: {
    className: {
      options: 'string',
    },
    defaultValue: {
      options: 'string',
    },
    disabled: {
      options: 'boolean',
    },
    label: {
      options: 'string',
    },
    options: {
      options: 'Option[]',
    },
    placeholder: {
      options: 'string',
    },
    required: {
      options: 'boolean',
    },
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
    label: 'fruits',
    options: [
      {
        disabled: false,
        label: 'Banana',
        value: 'banana',
      },
      {
        disabled: false,
        label: 'Orange',
        value: 'orange',
      },
      {
        disabled: false,
        label: 'Apple',
        value: 'apple',
      },
    ],
    required: false,
  },
}

export const WithPlaceholder: Story = {
  args: {
    disabled: false,
    label: 'fruits',
    options: [
      {
        disabled: false,
        label: 'Banana',
        value: 'banana',
      },
      {
        disabled: false,
        label: 'Orange',
        value: 'orange',
      },
      {
        disabled: false,
        label: 'Apple',
        value: 'apple',
      },
    ],
    placeholder: 'choose',
    required: false,
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'orange',
    disabled: false,
    label: 'fruits',
    options: [
      {
        disabled: false,
        label: 'Banana',
        value: 'banana',
      },
      {
        disabled: false,
        label: 'Orange',
        value: 'orange',
      },
      {
        disabled: false,
        label: 'Apple',
        value: 'apple',
      },
    ],
    required: false,
  },
}

export const WithDisabledItem: Story = {
  args: {
    disabled: false,
    label: 'fruits',
    options: [
      {
        disabled: true,
        label: 'Banana',
        value: 'banana',
      },
      {
        disabled: false,
        label: 'Orange',
        value: 'orange',
      },
      {
        disabled: false,
        label: 'Apple',
        value: 'apple',
      },
    ],
    placeholder: 'choose',
    required: false,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'fruits',
    options: [
      {
        disabled: true,
        label: 'Banana',
        value: 'banana',
      },
      {
        disabled: false,
        label: 'Orange',
        value: 'orange',
      },
      {
        disabled: false,
        label: 'Apple',
        value: 'apple',
      },
    ],
    placeholder: 'choose',
    required: false,
  },
}
