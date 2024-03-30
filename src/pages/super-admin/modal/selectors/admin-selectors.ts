import { RootState } from '@/shared/providers/store-provider'

export const selectPageSize = (state: RootState) => state.admin.pageSize
export const selectPageNumber = (state: RootState) => state.admin.pageNumber
