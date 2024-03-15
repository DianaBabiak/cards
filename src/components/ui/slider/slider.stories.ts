import type { Meta, StoryObj } from '@storybook/react'

import { CustomSlider } from '@/components/ui/slider/Slider'

const meta = {
  argTypes: {},
  component: CustomSlider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof CustomSlider>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {
    max: 10,
    min: 1,
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: [2, 8],
    max: 10,
    min: 1,
  },
}

export const WithStepValue: Story = {
  args: {
    max: 10,
    min: 1,
    step: 2,
  },
}

export const WithDisabled: Story = {
  args: {
    disabled: true,
    max: 10,
    min: 1,
  },
}
