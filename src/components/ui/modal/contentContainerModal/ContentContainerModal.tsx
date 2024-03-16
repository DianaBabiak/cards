import { forwardRef } from 'react'

import { CardModal } from '@/components/ui/modal/contentContainerModal/cardModal/CardModal'
import { ModalWithSelector } from '@/components/ui/modal/contentContainerModal/modalWithSelector/ModalWithSelector'
import { Option } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

import s from '@/components/ui/modal/modal.module.scss'

export enum VariantModalContent {
  addCard = 'addCard',
  text = 'text',
  withSelector = 'withSelector',
}

export type ContentContainerModalProps = {
  contentText?: string
  labelCheckBox?: string
  labelSelector?: string
  labelTextFields?: string[]
  placeholderTextFields?: string[]
  selectOptions?: Option[]
  selectPlaceholder?: string
  variant?: VariantModalContent
}
export const ContentContainerModal = forwardRef<HTMLDivElement, ContentContainerModalProps>(
  (
    {
      contentText,
      labelCheckBox,
      labelSelector,
      labelTextFields,
      placeholderTextFields,
      selectOptions,
      selectPlaceholder,
      variant = VariantModalContent.text,
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

        {variant === VariantModalContent.addCard && (
          <CardModal
            labelCheckBox={labelCheckBox}
            labelTextField={labelTextFields?.[0]}
            placeholderTextFields={placeholderTextFields}
          />
        )}
      </div>
    )
  }
)
