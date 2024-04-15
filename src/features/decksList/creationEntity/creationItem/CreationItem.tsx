import { ChangeEvent, useState } from 'react'
import { Control, FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/button'
import { ControlledTextField } from '@/components/ui/controlled/controlled-textField/controlled-textField'
import { Typography } from '@/components/ui/typography'

import s from '@/components/ui/modal/modal.module.scss'

interface CreationItemProps<T extends FieldValues> {
  control: Control<T>
  defaultImage?: string
  error?: string
  label: string
  nameImg: (Path<T> & string) | (Path<T> & undefined)
  nameTextField: (Path<T> & string) | (Path<T> & undefined)
  placeholder: string
  register: UseFormRegister<T>
  title?: string
}

export const CreationItem = <T extends object>({
  control,
  defaultImage,
  error,
  label,
  nameImg,
  nameTextField,
  placeholder,
  register,
  title,
}: CreationItemProps<T>) => {
  const [selectedImage, setSelectedImage] = useState(defaultImage || null)
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
    <div className={s.wrapperItemCard}>
      {title && <Typography variant={'subtitle2'}>{title}</Typography>}
      <ControlledTextField
        className={s.hundredPercentWidth}
        control={control}
        errorMessage={error}
        label={label}
        name={nameTextField}
        placeholder={placeholder}
      />
      <div className={s.wrapperImgContent}>
        {selectedImage && <img alt={label} src={selectedImage} />}
        <label className={s.customFileInput}>
          <input
            className={s.coverInput}
            {...register(nameImg, { onChange: handleImageChange })}
            type={'file'}
          />
          <Button as={'span'} isFullWidth variant={'secondary'}>
            <Icon iconId={'chooseFile'} />
            <Typography variant={'subtitle2'}>Change Cover</Typography>
          </Button>
        </label>
      </div>
    </div>
  )
}
