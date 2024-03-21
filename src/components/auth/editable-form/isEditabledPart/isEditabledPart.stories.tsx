import type { Meta, StoryObj } from '@storybook/react'

import { IsEditabledPart } from '@/components/auth/editable-form/isEditabledPart/isEditabledPart'

const meta = {
  argTypes: {},
  component: IsEditabledPart,
  tags: ['autodocs'],
  title: 'Components/EditableForm/IsEditabledPart',
} satisfies Meta<typeof IsEditabledPart>

export default meta
type Story = StoryObj<typeof meta>

export const IsEditableWithoutEmail: Story = {
  args: {
    currentName: 'Alex',
    setIsEditable: () => {},
  },
}

export const IsEditableWithEmail: Story = {
  args: {
    currentName: 'Alex',
    email: 'predator12007@mail.ru',
    setIsEditable: () => {},
  },
}
