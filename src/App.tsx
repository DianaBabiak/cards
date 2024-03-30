import { Header } from '@/features/header'
import { Router } from '@/router'

export function App() {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
    </>
  )
}
