import { ChangeEvent, createRef, forwardRef, useState } from 'react'

import { Icon } from '@/components/ui/icon'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

import s from '@/components/ui/modal/modal.module.scss'

export type CreationItemProps = {
  defaultImage?: string
  label: string
  placeholder: string
  title?: string
}

export const CreationItem = forwardRef<HTMLDivElement, CreationItemProps>(
  ({ defaultImage, label, placeholder, title }, ref) => {
    const [selectedImage, setSelectedImage] = useState(defaultImage)
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
        {title && <Typography variant={'subtitle2'}>{title}</Typography>}
        <TextField className={s.hundredPercentWidth} label={label} placeholder={placeholder} />
        <div className={s.wrapperImgContent}>
          {selectedImage && <img alt={label} src={selectedImage} />}
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
