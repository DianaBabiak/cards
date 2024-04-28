import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { Icon } from '@/components/ui/Icon'
import { Typography } from '@/components/ui/typography'

import s from './TextField.module.scss'

export type Props = {
  errorMessage?: string
  inputType?: 'password' | 'search' | 'text'
  label?: string
  onValueChange?: (value: string) => void
  value?: string
} & ComponentPropsWithoutRef<'input'>
export const TextField = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      disabled,
      errorMessage,
      inputType,
      label,
      onChange,
      onValueChange,
      placeholder,
      value,
    },
    ref
  ) => {
    const [showPasword, setShowPasword] = useState(false)
    const inputPassword = inputType === 'password'
    const inputSearch = inputType === 'search'
    const classNames = {
      input: `${s.input} ${errorMessage ? s.error : ''} ${
        inputSearch ? s.hasSearch : ''
      } ${className}`,
      inputContainer: `${s.InputContainer} ${className}`,
      span: `${errorMessage ? s.errorText : ''} ${className}`,
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.currentTarget.value)
    }
    const showPasswordHandler = () => setShowPasword(!showPasword)
    const getInputType = (type: Props['type'], showPassword: boolean) => {
      if (type === 'password' && showPassword) {
        return 'text'
      }

      return type
    }
    const currentInputType = getInputType(inputType, showPasword)

    return (
      <div className={s.container}>
        {label && !inputSearch && <span className={s.label}>{label}</span>}
        {/*<div className={s.InputContainer}>*/}
        <div className={classNames.inputContainer}>
          {inputSearch && (
            <button className={s.buttonSearch}>
              <Icon iconId={'search'} />
            </button>
          )}
          <input
            autoFocus
            className={classNames.input}
            disabled={disabled}
            onChange={onChangeHandler}
            placeholder={placeholder}
            ref={ref}
            type={currentInputType}
            value={value}
          />
          {inputPassword && (
            <div className={s.buttonEye} onClick={showPasswordHandler}>
              {showPasword ? (
                <Icon height={'20px'} iconId={'eyeOutlineOff'} width={'20px'} />
              ) : (
                <Icon iconId={'eyeOutline'} />
              )}
            </div>
          )}
        </div>
        {errorMessage && (
          <Typography as={'div'} className={classNames.span} colorTheme={'danger'}>
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)
