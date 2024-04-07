import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/button'
import { DropDownMenu, DropdownItem, DropdownItemWithImg } from '@/components/ui/dropDownMenu'
import { Typography } from '@/components/ui/typography'

import s from './header.module.scss'

import logo from '../../assets/Logo.png'

type HeaderProps = {
  email?: string
  isInitialization?: boolean
  name?: string
  userPhoto?: string
}
const defaultPhoto =
  'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg'

export const Header = ({
  email = 'gggg@gmail.com',
  isInitialization = true,
  name = 'Ivan',
  userPhoto = defaultPhoto,
}: HeaderProps) => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <img alt={'logo'} src={logo} />
        {!isInitialization ? (
          <Button variant={'secondary'}>Sign In</Button>
        ) : (
          <div className={s.containerUserInformation}>
            <Typography className={s.name} variant={'subtitle1'}>
              {name}
            </Typography>
            <DropDownMenu
              trigger={
                <button>
                  <img alt={'photoUser'} className={s.photoUser} src={userPhoto} />
                </button>
              }
            >
              <DropdownItemWithImg
                email={email}
                icon={
                  <img
                    alt={'photo user'}
                    src={userPhoto}
                    style={{ borderRadius: '50%', height: '36px', width: '36px' }}
                  />
                }
                name={name}
              />
              <DropdownItem>
                <Icon height={'16px'} iconId={'person'} viewBox={'0 0 16 16 '} width={'16px'} />
                My Profile
              </DropdownItem>
              <DropdownItem>
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
