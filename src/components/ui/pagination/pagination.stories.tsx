import { useState } from 'react'

import { Pagination } from '@/components/ui/pagination/Pagination'
import { Meta } from '@storybook/react'

export default {
  component: Pagination,
  title: 'Components/Pagination',
} as Meta<typeof Pagination>

export const Default = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState('8')
  const TOTAL_PAGES_COUNT = 10

  return (
    <>
      <Pagination
        count={TOTAL_PAGES_COUNT}
        onChange={setPage}
        onPerPageChange={setPerPage}
        page={page}
        perPage={perPage}
        perPageOptions={['5', '8', '12', '100']}
      />
      <div>Current page: {page}</div>
      <div>Per page: {perPage}</div>
    </>
  )
}

export const DefaultWithTwoPages = () => {
  const [page, setPage] = useState(1)
  const TOTAL_PAGE_COUNT = 2

  return (
    <div>
      <Pagination count={TOTAL_PAGE_COUNT} onChange={setPage} page={page} />
      <div>Current page: {page}</div>
    </div>
  )
}

export const DefaultWithOnePages = () => {
  const [page, setPage] = useState(1)
  const TOTAL_PAGE_COUNT = 1

  return (
    <div>
      <Pagination count={TOTAL_PAGE_COUNT} onChange={setPage} page={page} />
      <div>Current page: {page}</div>
    </div>
  )
}
