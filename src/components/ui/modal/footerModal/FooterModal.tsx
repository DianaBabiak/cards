import { forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import * as Dialog from '@radix-ui/react-dialog'

import s from '@/components/ui/modal/modal.module.scss'

export type FooterModalProps = {
  isShowSecondaryButton?: boolean
  labelPrimaryButton: string
  labelSecondaryButton?: string
  onClickPrimaryButton: () => void
  onClickSecondaryButton?: () => void
}

export const FooterModal = forwardRef<HTMLDivElement, FooterModalProps>(
  (
    {
      isShowSecondaryButton = true,
      labelPrimaryButton,
      labelSecondaryButton,
      onClickPrimaryButton,
      onClickSecondaryButton,
    },
    ref
  ) => {
    return (
      <div
        className={`${s.wrapperFooter} ${
          !isShowSecondaryButton ? s.wrapperFooterWithoutSecondaryButton : ''
        }`}
        ref={ref}
      >
        {isShowSecondaryButton && (
          <Dialog.Close asChild>
            <Button onClick={onClickSecondaryButton} variant={'secondary'}>
              {labelSecondaryButton}
            </Button>
          </Dialog.Close>
        )}
        <Dialog.Close asChild>
          <Button onClick={onClickPrimaryButton}>{labelPrimaryButton}</Button>
        </Dialog.Close>
      </div>
    )
  }
)
