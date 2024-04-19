import { Control } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ControlledTextField } from '@/components/ui/controlled/controlled-textField/controlled-textField'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import h from '../editable-form.module.scss'
import s from './isEditabledPart.module.scss'

type IsEditablePartProps = {
  avatar?: null | string
  control: Control<any>
  currentName: string
  errorMessage?: string
  updatedUserDataHandler: () => void
}
const defaultPhoto =
  'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg'

export const IsEditablePart = (props: IsEditablePartProps) => {
  const { avatar, control, currentName, errorMessage, updatedUserDataHandler } = props

  return (
    <div>
      <img alt={'avatar'} className={clsx(s.avatar, h.avatar)} src={avatar || defaultPhoto} />
      <div className={s.formInputWrapper}>
        <ControlledTextField
          className={s.formInput}
          control={control}
          defaultValue={currentName}
          errorMessage={errorMessage}
          label={'Nickname'}
          name={'nickname'}
          type={'text'}
        />
      </div>
      <Button isFullWidth onClick={updatedUserDataHandler}>
        <Typography variant={'subtitle2'}>Save Changes</Typography>
      </Button>
    </div>
  )
}
