import { forwardRef } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from '@/components/ui/modal/modal.module.scss'

export type HeaderModalProps = {
  isHeaderContent?: boolean
  title: string
}
export const HeaderModal = forwardRef<HTMLDivElement, HeaderModalProps>(
  ({ isHeaderContent = true, title }, ref) => {
    return (
      <div className={s.wrapperHeader} ref={ref}>
        {isHeaderContent && (
          <>
            <Dialog.Title className={s.dialogTitle}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label={'Close'} className={s.iconButton}>
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </>
        )}
      </div>
    )
  }
)
