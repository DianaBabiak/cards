import { ComponentPropsWithoutRef, forwardRef } from 'react'

import {
  ContentContainerModal,
  VariantModalContent,
} from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { FooterModal } from '@/components/ui/modal/footerModal/FooterModal'
import { HeaderModal } from '@/components/ui/modal/headerModal/HeaderModal'
import { Option } from '@/components/ui/select'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

export type ModalProps = {
  className?: string
  contentText?: string
  headerTitle: string
  isHeaderContent?: boolean
  isShowFooterSecondaryButton?: boolean
  labelCheckBox?: string
  labelFooterPrimaryButton: string
  labelFooterSecondaryButton?: string
  labelSelector?: string
  labelTextFields?: string[]
  placeholderTextFields?: string[]
  selectOptions?: Option[]
  selectPlaceholder?: string
  variant?: VariantModalContent
} & ComponentPropsWithoutRef<typeof Dialog.Root>

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      contentText,
      headerTitle,
      isHeaderContent,
      isShowFooterSecondaryButton,
      labelCheckBox,
      labelFooterPrimaryButton,
      labelFooterSecondaryButton,
      labelSelector,
      labelTextFields,
      placeholderTextFields,
      selectOptions,
      selectPlaceholder,
      variant,
      ...rest
    },
    ref
  ) => {
    return (
      <Dialog.Root open {...rest}>
        <Dialog.Portal>
          <Dialog.Overlay className={s.dialogOverlay} />
          <Dialog.Content className={`${s.dialogContent} ${className}`} ref={ref}>
            <HeaderModal isHeaderContent={isHeaderContent} title={headerTitle} />
            <ContentContainerModal
              contentText={contentText}
              labelCheckBox={labelCheckBox}
              labelSelector={labelSelector}
              labelTextFields={labelTextFields}
              placeholderTextFields={placeholderTextFields}
              selectOptions={selectOptions}
              selectPlaceholder={selectPlaceholder}
              variant={variant}
            />
            <FooterModal
              isShowSecondaryButton={isShowFooterSecondaryButton}
              labelPrimaryButton={labelFooterPrimaryButton}
              labelSecondaryButton={labelFooterSecondaryButton}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }
)
