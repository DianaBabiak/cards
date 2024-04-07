import { ChangeEvent, useState } from 'react'

import avatar from '@/assets/Ellipse 45.png'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import h from '../editable-form.module.scss'
import s from './isCompletedPart.module.scss'

type IsCompletedPartProps = {
  currentName: string
  email?: string
  setIsEditable: (isEditable: boolean) => void
}

export const IsCompletedPart = (props: IsCompletedPartProps) => {
  const { currentName, email, setIsEditable } = props

  const [currentAvatar, setCurrentAvatar] = useState(avatar)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setCurrentAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={s.formWrapper}>
      <div className={s.avatarWrapper}>
        <img alt={'avatar'} className={h.avatar} src={currentAvatar} />
        <label>
          <input className={s.editAvatarInput} onChange={handleImageChange} type={'file'} />
          <div className={s.editAvatarBtn}>
            <Icon height={'16'} iconId={'edit2'} viewBox={'0 0 16 16'} width={'16'} />
          </div>
        </label>
      </div>

      <div className={s.nameWrapper}>
        <Typography as={'h2'} className={s.name} variant={'h2'}>
          {currentName}
        </Typography>
        <div
          className={s.editNameIcon}
          onClick={() => {
            setIsEditable(true)
          }}
        >
          <Icon iconId={'edit2'} />
        </div>
      </div>

      {email && <Typography colorTheme={'dark'}>{email}</Typography>}

      <Button className={s.isEditableFormButton} isImg variant={'secondary'}>
        <Typography variant={'subtitle2'}>Logout</Typography>
      </Button>
    </div>
  )
}
