import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'

import s from '@/components/ui/modal/modal.module.scss'

export enum VariantModalContent {
  text = 'text',
  withChildren = 'withChildren',
}

export type ContentContainerModalProps = {
  contentText?: string
  variant: VariantModalContent
} & ComponentPropsWithoutRef<'div'>
export const ContentContainerModal = forwardRef<HTMLDivElement, ContentContainerModalProps>(
  ({ children, contentText, variant }, ref) => {
    return (
      <div className={s.wrapperContent} ref={ref}>
        {variant === VariantModalContent.text && (
          <Typography className={s.text}>{contentText}</Typography>
        )}
        {variant === VariantModalContent.withChildren && children}
      </div>
    )
  }
)
