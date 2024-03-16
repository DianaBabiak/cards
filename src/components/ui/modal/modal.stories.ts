import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from '@/components/ui/modal'
import { VariantModalContent } from '@/components/ui/modal/contentContainerModal/ContentContainerModal'

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
    labelCheckBox: {
      options: 'string',
    },
    labelFooterPrimaryButton: {
      options: 'string',
    },
    labelFooterSecondaryButton: {
      options: 'string',
    },
    labelSelector: {
      options: 'string',
    },
    labelTextFields: {
      options: 'string[]',
    },
    placeholderTextFields: {
      options: 'string[]',
    },
    selectOptions: {
      options: 'Option[]',
    },
    selectPlaceholder: {
      options: 'string',
    },
    variant: {
      options: 'VariantModalContent',
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
    labelFooterPrimaryButton: 'Primary button',
    labelFooterSecondaryButton: 'Secondary button',
    variant: VariantModalContent.text,
  },
}

export const ModalWithSelector: Story = {
  args: {
    headerTitle: 'Title',
    labelCheckBox: 'Label',
    labelFooterPrimaryButton: 'Primary button',
    labelFooterSecondaryButton: 'Secondary button',
    labelSelector: 'Label',
    labelTextFields: ['label 1', 'label 2'],
    selectOptions: [
      { disabled: false, label: 'variant 1', value: 'variant1' },
      { disabled: false, label: 'variant 2', value: 'variant2' },
    ],
    selectPlaceholder: 'choose',
    variant: VariantModalContent.withSelector,
  },
}

export const CardModal: Story = {
  args: {
    headerTitle: 'Title',
    labelCheckBox: 'Label',
    labelFooterPrimaryButton: 'Primary button',
    labelFooterSecondaryButton: 'Secondary button',
    labelTextFields: ['label 1'],
    placeholderTextFields: ['Name', 'Name', 'Input'],
    variant: VariantModalContent.addCard,
  },
}
