import { Control } from 'react-hook-form'

import avatar from '@/assets/Ellipse 45.png'
import { Button } from '@/components/ui/button'
import { ControlledTextField } from '@/components/ui/controlled/controlled-textField/controlled-textField'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import h from '../editable-form.module.scss'
import s from './isEditabledPart.module.scss'

type IsEditablePartProps = {
  control: Control<{ nickname: string }, any>
  currentName: string
  errorMessage?: string
}

export const IsEditablePart = (props: IsEditablePartProps) => {
  const { control, currentName, errorMessage } = props

  return (
    <div>
      <img alt={'avatar'} className={clsx(s.avatar, h.avatar)} src={avatar} />
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
      <Button isFullWidth>
        <Typography variant={'subtitle2'}>Save Changes</Typography>
      </Button>
    </div>
  )
}
