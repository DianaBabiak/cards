import { CustomTabs } from '@/components/ui/tabs/tabs'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: CustomTabs,
  //для создания Docs с общей страницей
  tags: ['autodocs'],
  //для красоты чтоб было все названо слева в уголке
  title: 'Components/CustomTabs',
} satisfies Meta<typeof CustomTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {
    tabs: [
      { title: 'My Cards', value: 'tab1' },
      { title: 'All Cards', value: 'tab2' },
    ],
    tabsName: 'Demo',
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'tab2',
    tabs: [
      { title: 'My Cards', value: 'tab1' },
      { title: 'All Cards', value: 'tab2' },
    ],
  },
}

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { disabled: true, title: 'My Cards', value: 'tab1' },
      { title: 'All Cards', value: 'tab2' },
    ],
  },
}
