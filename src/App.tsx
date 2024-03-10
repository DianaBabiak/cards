import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/Card'

export function App() {
  return (
    <div>
      <Button variant={'primary'}>Name</Button>
      <Button as={'a'} variant={'primary'}>
        Name
      </Button>
      <Card />
    </div>
  )
}
