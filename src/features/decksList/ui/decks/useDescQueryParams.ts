import { useSearchParams } from 'react-router-dom'

import { ResponseGetMinMaxCards } from '@/features/decksList/api'

type QueryParams = {
  authorId: string
  items: number
  maxCards: string
  minCards: string
  name: string
  orderBy: string
  page: number
  slider: string
}

type UseDescQueryParamsProps = {
  minMaxCards?: ResponseGetMinMaxCards
}

export const useDescQueryParams = ({ minMaxCards }: UseDescQueryParamsProps) => {
  const LSKey = 'descFilters'
  const [searchParams, setSearchParams] = useSearchParams()

  const filtersFromLS: QueryParams = localStorage.getItem(LSKey)
    ? JSON.parse(localStorage.getItem(LSKey) as string)
    : {}

  const minCards =
    searchParams.get('minCards') ||
    filtersFromLS.minCards ||
    (minMaxCards?.min ? Number(minMaxCards?.min) : undefined)
  const maxCards =
    searchParams.get('maxCards') ||
    filtersFromLS.maxCards ||
    (minMaxCards?.max ? Number(minMaxCards?.max) : undefined)

  const name = searchParams.get('name') || filtersFromLS.name || ''
  const orderBy = searchParams.get('orderBy') || filtersFromLS.orderBy || 'updated-asc'
  const itemsPerPage = Number(searchParams.get('items')) || filtersFromLS.items || 10
  const page = Number(searchParams.get('page')) || filtersFromLS.page || 1
  const authorId = searchParams.get('authorId') || filtersFromLS.authorId || undefined

  const handleChangePage = (newPage: number) => {
    searchParams.set('page', newPage.toString())
    setSearchParams(searchParams)
    localStorage.setItem(LSKey, JSON.stringify({ ...filtersFromLS, page: newPage }))
  }

  const handleChangeItemsPerPage = (newitems: string) => {
    searchParams.set('items', newitems)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
    localStorage.setItem(LSKey, JSON.stringify({ ...filtersFromLS, items: newitems, page: 1 }))
  }

  const handleChangeOrderBy = (newOrderBy: 'asc' | 'desc') => {
    if (newOrderBy) {
      searchParams.set('orderBy', `updated-${newOrderBy}`)
      localStorage.setItem(
        LSKey,
        JSON.stringify({ ...filtersFromLS, orderBy: `updated-${newOrderBy}`, page: 1 })
      )
    } else {
      searchParams.delete('orderBy')
      localStorage.setItem(LSKey, JSON.stringify({ ...filtersFromLS, orderBy: undefined, page: 1 }))
    }
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const handleChangeName = (value: string) => {
    if (value) {
      searchParams.set('name', value)
    } else {
      searchParams.delete('name')
    }
    searchParams.set('page', '1')
    setSearchParams(searchParams)
    localStorage.setItem(LSKey, JSON.stringify({ ...filtersFromLS, name: value ?? '', page: 1 }))
  }

  const handleChangeAuthorId = (value: string) => {
    if (value) {
      searchParams.set('authorId', value)
    } else {
      searchParams.delete('authorId')
    }

    searchParams.set('page', '1')
    setSearchParams(searchParams)
    localStorage.setItem(LSKey, JSON.stringify({ ...filtersFromLS, authorId: value, page: 1 }))
  }

  const handleChangeSliderValues = (values: [min: number, max: number]) => {
    searchParams.set('minCards', `${values[0]}`)
    searchParams.set('maxCards', `${values[1]}`)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
    localStorage.setItem(
      LSKey,
      JSON.stringify({ ...filtersFromLS, maxCards: values[1], minCards: values[0], page: 1 })
    )
  }

  const onHandleClearFilters = () => {
    searchParams.delete('minCards')
    searchParams.delete('maxCards')
    searchParams.delete('name')
    searchParams.set('orderBy', 'updated-asc')
    searchParams.set('items', '10')
    searchParams.set('page', '1')
    searchParams.delete('authorId')
    setSearchParams(searchParams)
    localStorage.setItem(LSKey, '{}')
  }

  console.log('name', name)

  return {
    authorId,
    handleChangeAuthorId,
    handleChangeItemsPerPage,
    handleChangeName,
    handleChangeOrderBy,
    handleChangePage,
    handleChangeSliderValues,
    items: itemsPerPage,
    itemsPerPage,
    maxCards: maxCards ? Number(maxCards) : undefined,
    minCards: minCards ? Number(minCards) : undefined,
    name,
    onHandleClearFilters,
    orderBy,
    page,
  }
}
