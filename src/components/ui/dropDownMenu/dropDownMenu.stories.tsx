import type { Meta, StoryObj } from '@storybook/react'
import {
  DropdownItem,
  DropdownItemWithImg,
  DropDownMenu,
} from '@/components/ui/dropDownMenu/DropDownMenu'
import { Icon } from '@/components/ui/Icon'

const meta = {
  title: 'Components/Dropdown',
  component: DropDownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['auto docs'],
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownDefault: Story = {
  args: {
    trigger: (
      <button>
        <Icon
          height={'24px'}
          iconId={'moreVerticalOutline'}
          width={'24px'}
          viewBox={'0 0 24 24 '}
        />
      </button>
    ),
    children: (
      <>
        <DropdownItem>
          <Icon height={'16px'} iconId={'playCircle'} width={'16px'} viewBox={'0 0 16 16 '} />
          Learn
        </DropdownItem>
        <DropdownItem>
          <Icon height={'16px'} iconId={'edit2'} width={'16px'} viewBox={'0 0 16 16 '} />
          Edit
        </DropdownItem>
        <DropdownItem>
          <Icon height={'16px'} iconId={'trash'} width={'16px'} viewBox={'0 0 16 16 '} />
          Delete
        </DropdownItem>
      </>
    ),
  },
}

export const DropdownWithImg: Story = {
  args: {
    trigger: (
      <button>
        <img src={'https://placehold.co/36'} alt={'img'} />
      </button>
    ),
    children: (
      <>
        <DropdownItemWithImg
          name={'Ivan'}
          email={'j&johnson@gmail.com'}
          icon={
            <img
              src="https://yt3.googleusercontent.com/ytc/AIdro_k2wsQa2j9sAhjS25DyZxrhAGDJWtNZBYcLVd3uqQ=s900-c-k-c0x00ffffff-no-rj"
              alt="img"
              style={{ width: '36px', height: '36px', borderRadius: '50%' }}
            />
          }
        />
        <DropdownItem>
          <Icon height={'16px'} iconId={'person'} width={'16px'} viewBox={'0 0 16 16 '} />
          My Profile
        </DropdownItem>
        <DropdownItem>
          <Icon height={'16px'} iconId={'logOut'} width={'16px'} viewBox={'0 0 16 16 '} />
          Sing out
        </DropdownItem>
      </>
    ),
  },
}
