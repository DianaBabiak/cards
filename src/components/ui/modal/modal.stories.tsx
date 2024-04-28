import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { ModalWithSelector } from '@/components/ui/modal/contentContainerModal/modalWithSelector/ModalWithSelector'
const meta = {
  argTypes: {
    contentText: {
      options: 'string',
    },
    headerTitle: {
      options: 'string',
    },
    isHeaderContent: {
      options: 'boolean',
    },
    isShowFooterSecondaryButton: {
      options: 'boolean',
    },
    labelFooterPrimaryButton: {
      options: 'string',
    },
    labelFooterSecondaryButton: {
      options: 'string',
    },
    variant: {
      options: 'string',
    },
  },
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    contentText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamdsa',
    headerTitle: 'Title',
    isOpen: true,
    labelFooterPrimaryButton: 'Primary button',
    labelFooterSecondaryButton: 'Secondary button',
    setIsOpen: () => {},
    variant: VariantModalContent.text,
  },
}

export const WithSelector: Story = {
  args: {
    children: (
      <ModalWithSelector
        labelCheckBox={'Label'}
        labelSelector={'Label'}
        labelTextFields={['label 1', 'label 2']}
        selectOptions={[
          { disabled: false, label: 'variant 1', value: 'variant1' },
          { disabled: false, label: 'variant 2', value: 'variant2' },
        ]}
        selectPlaceholder={'choose'}
      />
    ),
    headerTitle: 'Title',
    isOpen: true,
    labelFooterPrimaryButton: 'Primary button',
    labelFooterSecondaryButton: 'Secondary button',
    setIsOpen: () => {},
    variant: VariantModalContent.withChildren,
  },
}
