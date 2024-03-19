import { ChangeEvent, createRef, forwardRef, useState } from 'react'

import imgReact from '@/assets/imgReact.png'
import { Icon } from '@/components/ui/Icon'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

import s from '@/components/ui/modal/modal.module.scss'

export type ItemCardModalProps = {
  label: string
  placeholder?: string
}

export const ItemCardModal = forwardRef<HTMLDivElement, ItemCardModalProps>(
  ({ label, placeholder }, ref) => {
    const [selectedImage, setSelectedImage] = useState(imgReact)
    const inputRef = createRef<HTMLInputElement>()
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null

      if (file) {
        const reader = new FileReader()

        reader.onloadend = () => {
          setSelectedImage(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }

    return (
      <div className={s.wrapperItemCard} ref={ref}>
        <Typography variant={'subtitle2'}>{label}:</Typography>
        <TextField
          className={s.hundredPercentWidth}
          label={' Question?'}
          placeholder={placeholder}
        />
        <div className={s.wrapperImgContent}>
          <img alt={label} src={selectedImage} />
          <label className={s.customFileInput}>
            <input
              accept={'image/*'}
              className={s.coverInput}
              onChange={handleImageChange}
              ref={inputRef}
              type={'file'}
            />
            <div className={s.fileInputContent}>
              <Icon iconId={'chooseFile'} />
              <Typography variant={'subtitle2'}>Change Cover</Typography>
            </div>
          </label>
        </div>
      </div>
    )
  }
)
