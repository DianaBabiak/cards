import { RootState } from '@/services/store'

export const isClearSelector = (state: RootState): boolean => state.decksList.isClearFilters
