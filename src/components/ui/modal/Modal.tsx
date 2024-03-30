import { ComponentPropsWithoutRef, forwardRef } from 'react'

import {
  ContentContainerModal,
  VariantModalContent,
} from '@/components/ui/modal/contentContainerModal/ContentContainerModal'
import { FooterModal } from '@/components/ui/modal/footerModal/FooterModal'
import { HeaderModal } from '@/components/ui/modal/headerModal/HeaderModal'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

export type ModalProps = {
  className?: string
  contentText?: string
  headerTitle?: string
  isHeaderContent?: boolean
  isOpen: boolean
  isShowFooterSecondaryButton?: boolean
  labelFooterPrimaryButton: string
  labelFooterSecondaryButton?: string
  onClickPrimaryButton: () => void
  onClickSecondaryButton?: () => void
  setIsOpen: (isOpen: boolean) => void
  variant: VariantModalContent
} & ComponentPropsWithoutRef<typeof Dialog.Root>

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      className,
      contentText,
      headerTitle,
      isHeaderContent,
      isOpen,
      isShowFooterSecondaryButton,
      labelFooterPrimaryButton,
      labelFooterSecondaryButton,
      onClickPrimaryButton,
      onClickSecondaryButton,
      setIsOpen,
      variant,
      ...rest
    },
    ref
  ) => {
    return (
      <Dialog.Root onOpenChange={setIsOpen} open={isOpen} {...rest}>
        <Dialog.Portal>
          <Dialog.Overlay className={s.dialogOverlay} />
          <Dialog.Content className={`${s.dialogContent} ${className}`} ref={ref}>
            <HeaderModal isHeaderContent={isHeaderContent} title={headerTitle} />
            <ContentContainerModal contentText={contentText} variant={variant}>
              {children}
            </ContentContainerModal>
            <FooterModal
              isShowSecondaryButton={isShowFooterSecondaryButton}
              labelPrimaryButton={labelFooterPrimaryButton}
              labelSecondaryButton={labelFooterSecondaryButton}
              onClickPrimaryButton={onClickPrimaryButton}
              onClickSecondaryButton={onClickSecondaryButton}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }
)
