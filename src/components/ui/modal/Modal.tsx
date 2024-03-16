import { forwardRef } from 'react'

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
  contentText?: string
  headerTitle: string
  isHeaderContent?: boolean
  isShowFooterSecondaryButton?: boolean
  labelCheckBox?: string
  labelFooterPrimaryButton: string
  labelFooterSecondaryButton?: string
  labelSelector?: string
  labelTextFields?: string[]
  selectOptions?: Option[]
  variant?: VariantModalContent
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      contentText,
      headerTitle,
      isHeaderContent,
      isShowFooterSecondaryButton,
      labelCheckBox,
      labelFooterPrimaryButton,
      labelFooterSecondaryButton,
      labelSelector,
      labelTextFields,
      selectOptions,
      variant,
    },
    ref
  ) => {
    return (
      <Dialog.Root open>
        <Dialog.Portal>
          <Dialog.Overlay className={s.dialogOverlay} />
          <Dialog.Content className={s.dialogContent} ref={ref}>
            <HeaderModal isHeaderContent={isHeaderContent} title={headerTitle} />
            <ContentContainerModal
              contentText={contentText}
              labelCheckBox={labelCheckBox}
              labelSelector={labelSelector}
              labelTextFields={labelTextFields}
              selectOptions={selectOptions}
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
