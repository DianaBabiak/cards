import type { Meta, StoryObj } from '@storybook/react'

import { IsCompletedPart } from '@/components/auth/editable-form/isCompletedPart/isCompletedPart'

const meta = {
  argTypes: {},
  component: IsCompletedPart,
  tags: ['autodocs'],
  title: 'Auth/EditableForm/IsEditabledPart',
} satisfies Meta<typeof IsCompletedPart>

export default meta
type Story = StoryObj<typeof meta>

export const IsEditableWithoutEmail: Story = {
  args: {
    currentName: 'Alex',
    nameImg: '',
    onChange: () => {},
    setIsEditable: () => {},
    setValue: () => {},
  },
}

export const IsEditableWithEmail: Story = {
  args: {
    currentName: 'Alex',
    email: 'predator12007@mail.ru',
    nameImg: '',
    onChange: () => {},
    setIsEditable: () => {},
    setValue: () => {},
  },
}
