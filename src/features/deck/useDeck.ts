import { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export const useDeck = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { state } = useLocation()

  const navigate = useNavigate()

  const orderBy = searchParams.get('sort') || undefined

  const itemsPerPage = Number(searchParams.get('items')) || 10
  const page = Number(searchParams.get('page')) || 1
  const question = searchParams.get('question') || undefined
  const answer = searchParams.get('answer') || undefined

  const handleChangePage = (page: number) => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }
  const handleChangeQuestion = (question: string) => {
    if (question) {
      searchParams.set('question', question)
    } else {
      searchParams.delete('question')
    }
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const handleChangeItemsPerPage = (items: string) => {
    searchParams.set('items', items)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const handleToPreviewPage = () => {
    setSearchParams({})
    const prevUrl = localStorage.getItem('prevUrl')

    navigate(prevUrl ?? '/')
  }

  const handleChangeSort = (sort: 'asc' | 'desc') => {
    if (sort) {
      searchParams.set('sort', `created-${sort}`)
    } else {
      searchParams.delete('sort')
    }
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if (state) {
      localStorage.setItem('prevUrl', `/${state.search}`)
    }

    return () => {
      if (state) {
        localStorage.removeItem('prevUrl')
      }
    }
  }, [])

  return {
    answer,
    handleChangeItemsPerPage,
    handleChangePage,
    handleChangeQuestion,
    handleChangeSort,
    handleToPreviewPage,
    itemsPerPage,
    orderBy,
    page,
    question,
  }
}
