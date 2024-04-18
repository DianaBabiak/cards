import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useLogoutMutation } from '@/features/auth/api/auth-api'

import h from '../editable-form.module.scss'
import s from './isCompletedPart.module.scss'

type IsCompletedPartProps = {
  avatar?: null | string
  currentName: string
  email?: string
  setIsEditable: (isEditable: boolean) => void
}

const defaultPhoto =
  'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg'

export const IsCompletedPart = (props: IsCompletedPartProps) => {
  const { avatar, currentName, email, setIsEditable } = props

  const [currentAvatar, setCurrentAvatar] = useState(avatar || defaultPhoto)

  const [logout, {}] = useLogoutMutation()

  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      await logout()

      navigate('/login')
    } catch (err) {
      console.error('Ошибка при logout:', err)
    }
  }

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

      <Button
        className={s.isEditableFormButton}
        isImg
        onClick={logoutHandler}
        variant={'secondary'}
      >
        <Typography variant={'subtitle2'}>Logout</Typography>
      </Button>
    </div>
  )
}
