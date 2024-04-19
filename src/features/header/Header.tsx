import { Link, useNavigate } from 'react-router-dom'

import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/button'
import { DropDownMenu, DropdownItem, DropdownItemWithImg } from '@/components/ui/dropDownMenu'
import { Typography } from '@/components/ui/typography'
import { useLogoutMutation, useMeQuery } from '@/features/auth/api/auth-api'

import s from './header.module.scss'

import logo from '../../assets/Logo.png'

type HeaderProps = {}
const defaultPhoto =
  'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg'

export const Header = ({}: HeaderProps) => {
  const { data: meData, isLoading } = useMeQuery()
  const [logout, {}] = useLogoutMutation()
  const avatar = meData?.avatar ? meData?.avatar : defaultPhoto
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      await logout()

      navigate('/login')
    } catch (err) {
      console.error('Ошибка при logout:', err)
    }
  }

  if (isLoading) {
    return
  }

  return (
    <header className={s.header}>
      <div className={s.container}>
        <img alt={'logo'} src={logo} />
        {!meData ? (
          <Button variant={'secondary'}>Sign In</Button>
        ) : (
          <div className={s.containerUserInformation}>
            <Typography className={s.name} variant={'subtitle1'}>
              {meData.name}
            </Typography>
            <DropDownMenu
              trigger={
                <button>
                  <img alt={'photoUser'} className={s.photoUser} src={avatar} />
                </button>
              }
            >
              <DropdownItemWithImg
                className={s.dropdown}
                email={meData.email}
                icon={
                  <img
                    alt={'photo user'}
                    src={avatar}
                    style={{ borderRadius: '50%', height: '36px', width: '36px' }}
                  />
                }
                name={meData.name}
              />
              <Link className={s.link} to={'/profile'}>
                <DropdownItem>
                  <Icon height={'16px'} iconId={'person'} viewBox={'0 0 16 16 '} width={'16px'} />
                  My Profile
                </DropdownItem>
              </Link>
              <DropdownItem onClick={logoutHandler}>
                <Icon height={'16px'} iconId={'logOut'} viewBox={'0 0 16 16 '} width={'16px'} />
                Sing out
              </DropdownItem>
            </DropDownMenu>
          </div>
        )}
      </div>
    </header>
  )
}
