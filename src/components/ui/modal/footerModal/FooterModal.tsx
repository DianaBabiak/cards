import { forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import * as Dialog from '@radix-ui/react-dialog'

import s from '@/components/ui/modal/modal.module.scss'

export type FooterModalProps = {
  isShowSecondaryButton?: boolean
  labelPrimaryButton: string
  labelSecondaryButton?: string
}

export const FooterModal = forwardRef<HTMLDivElement, FooterModalProps>(
  ({ isShowSecondaryButton = true, labelPrimaryButton, labelSecondaryButton }, ref) => {
    return (
      <div
        className={`${s.wrapperFooter} ${
          !isShowSecondaryButton ? s.wrapperFooterWithoutSecondaryButton : ''
        }`}
        ref={ref}
      >
        {isShowSecondaryButton && (
          <Dialog.Close asChild>
            <Button variant={'secondary'}>{labelSecondaryButton}</Button>
          </Dialog.Close>
        )}
        <Dialog.Close asChild>
          <Button>{labelPrimaryButton}</Button>
        </Dialog.Close>
      </div>
    )
  }
)
