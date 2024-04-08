import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Control, FieldValues, Path, UseFormRegister, UseFormSetValue } from 'react-hook-form'

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
  nameImg: string
  nameTextField: (Path<T> & string) | (Path<T> & undefined)
  placeholder: string
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  title?: string
}

export const Item = <T extends object>({
  control,
  defaultImage,
  error,
  label,
  nameImg,
  nameTextField,
  placeholder,
  register,
  setValue,
  title,
}: CreationItemProps<T>) => {
  const [selectedImage, setSelectedImage] = useState(defaultImage || null)

  useEffect(() => {
    setSelectedImage(defaultImage ?? null)
  }, [defaultImage])

  const inputRef = useRef<HTMLInputElement>(null)
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setSelectedImage(URL.createObjectURL(file))
      setValue(nameImg, file)
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
            {...register(nameImg)}
            onChange={handleImageChange}
            ref={inputRef}
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
