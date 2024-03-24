import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { ModalWithSelector } from '@/components/ui/modal/contentContainerModal/modalWithSelector/ModalWithSelector'
import { Option } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

import s from '@/components/ui/modal/modal.module.scss'

export enum VariantModalContent {
  text = 'text',
  withChildren = 'withChildren',
  withSelector = 'withSelector',
}

export type ContentContainerModalProps = {
  contentText?: string
  labelCheckBox?: string
  labelSelector?: string
  labelTextFields?: string[]
  selectOptions?: Option[]
  selectPlaceholder?: string
  variant: VariantModalContent
} & ComponentPropsWithoutRef<'div'>
export const ContentContainerModal = forwardRef<HTMLDivElement, ContentContainerModalProps>(
  (
    {
      children,
      contentText,
      labelCheckBox,
      labelSelector,
      labelTextFields,
      selectOptions,
      selectPlaceholder,
      variant,
    },
    ref
  ) => {
    return (
      <div className={s.wrapperContent} ref={ref}>
        {variant === VariantModalContent.text && (
          <Typography className={s.text}>{contentText}</Typography>
        )}

        {variant === VariantModalContent.withSelector && (
          <ModalWithSelector
            labelCheckBox={labelCheckBox}
            labelSelector={labelSelector}
            labelTextFields={labelTextFields}
            selectOptions={selectOptions}
            selectPlaceholder={selectPlaceholder}
          />
        )}

        {variant === VariantModalContent.withChildren && children}
      </div>
    )
  }
)
