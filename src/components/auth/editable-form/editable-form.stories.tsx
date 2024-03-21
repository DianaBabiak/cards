import type { Meta, StoryObj } from '@storybook/react'

import { EditableForm } from '@/components/auth/editable-form/editable-form'

const meta = {
  argTypes: {},
  component: EditableForm,
  tags: ['autodocs'],
  title: 'Components/EditableForm',
} satisfies Meta<typeof EditableForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
export const WithStartName: Story = {
  args: {
    profileName: 'Ivan',
  },
}
