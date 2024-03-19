import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from '@/components/ui/Icon'
import {
  DropDownMenu,
  DropdownItem,
  DropdownItemWithImg,
} from '@/components/ui/dropDownMenu/DropDownMenu'

const meta = {
  component: DropDownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['auto docs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownDefault: Story = {
  args: {
    children: (
      <>
        <DropdownItem>
          <Icon height={'16px'} iconId={'playCircle'} viewBox={'0 0 16 16 '} width={'16px'} />
          Learn
        </DropdownItem>
        <DropdownItem>
          <Icon height={'16px'} iconId={'edit2'} viewBox={'0 0 16 16 '} width={'16px'} />
          Edit
        </DropdownItem>
        <DropdownItem>
          <Icon height={'16px'} iconId={'trash'} viewBox={'0 0 16 16 '} width={'16px'} />
          Delete
        </DropdownItem>
      </>
    ),
    trigger: (
      <button>
        <Icon
          height={'24px'}
          iconId={'moreVerticalOutline'}
          viewBox={'0 0 24 24 '}
          width={'24px'}
        />
      </button>
    ),
  },
}

export const DropdownWithImg: Story = {
  args: {
    children: (
      <>
        <DropdownItemWithImg
          email={'j&johnson@gmail.com'}
          icon={
            <img
              alt={'img'}
              src={
                'https://yt3.googleusercontent.com/ytc/AIdro_k2wsQa2j9sAhjS25DyZxrhAGDJWtNZBYcLVd3uqQ=s900-c-k-c0x00ffffff-no-rj'
              }
              style={{ borderRadius: '50%', height: '36px', width: '36px' }}
            />
          }
          name={'Ivan'}
        />
        <DropdownItem>
          <Icon height={'16px'} iconId={'person'} viewBox={'0 0 16 16 '} width={'16px'} />
          My Profile
        </DropdownItem>
        <DropdownItem>
          <Icon height={'16px'} iconId={'logOut'} viewBox={'0 0 16 16 '} width={'16px'} />
          Sing out
        </DropdownItem>
      </>
    ),
    trigger: (
      <button>
        <img alt={'img'} src={'https://placehold.co/36'} />
      </button>
    ),
  },
}
