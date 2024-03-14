import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/Card'
import { DropDownMenu, DropdownItem } from '@/components/ui/dropDownMenu/DropDownMenu'

export function App() {
  const trigger = (
    <button
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '24px',
        justifyContent: 'center',
        marginLeft: '300px',
        width: '24px',
      }}
    >
      {'///'}
    </button>
  )

  return (
    <div>
      <Button variant={'primary'}>Name</Button>
      <Button as={'a'} variant={'primary'}>
        Name
      </Button>
      <Card />
      <DropDownMenu align={'end'} trigger={trigger}>
        <DropdownItem>
          <Icon height={'16px'} iconId={'person'} width={'16px'} />
          My Profileaefawefwaefawef
        </DropdownItem>
        <DropdownItem>Sing out</DropdownItem>
        <DropdownItem>Sing out</DropdownItem>
        <DropdownItem>Sing out</DropdownItem>
      </DropDownMenu>
    </div>
  )
}
