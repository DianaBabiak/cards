import { forwardRef } from 'react'

import { CardModal } from '@/components/ui/modal/contentContainerModal/cardModal/CardModal'
import { DeckModal } from '@/components/ui/modal/contentContainerModal/deskModal/DeskModal'
import { ModalWithSelector } from '@/components/ui/modal/contentContainerModal/modalWithSelector/ModalWithSelector'
import { Option } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

import s from '@/components/ui/modal/modal.module.scss'

export enum VariantModalContent {
  addCard = 'addCard',
  addDeck = 'addDeck',
  text = 'text',
  withSelector = 'withSelector',
}

export type ContentContainerModalProps = {
  contentText?: string
  defaultImage?: string
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
      defaultImage,
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
            defaultImage={defaultImage}
            labelCheckBox={labelCheckBox}
            placeholderTextFields={placeholderTextFields}
          />
        )}

        {variant === VariantModalContent.addDeck && (
          <DeckModal
            labelCheckBox={labelCheckBox}
            labelTextField={labelTextFields}
            placeholderTextFields={placeholderTextFields}
          />
        )}
      </div>
    )
  }
)
