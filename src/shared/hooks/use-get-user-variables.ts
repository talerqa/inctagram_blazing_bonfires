import { useState } from 'react'

import { useSelector } from 'react-redux'

import { SortDirection, UserBlockStatus } from '@/__generated__/graphql'
import {
  selectBlockStatus,
  selectSearchParameter,
} from '@/features/super-admin-user-management/model/user-management-slice'
import {
  selectPageNumber,
  selectPageSize,
} from '@/pages/super-admin/modal/selectors/admin-selectors'
import { SortType } from '@/shared/ui/table/table'

export type GetUserVariablesType = {
  pageSize: number
  pageNumber: number
  sortBy: string
  sortDirection: SortDirection
  searchTerm: string
  statusFilter: UserBlockStatus
}

export const useGetUserVariables = () => {
  const pageNumber = useSelector(selectPageNumber) // its currently selected page
  const itemsPerPage = useSelector(selectPageSize)
  const blockStatus = useSelector(selectBlockStatus)
  const searchValue = useSelector(selectSearchParameter)
  const [sort, setSort] = useState<SortType>({ direction: SortDirection.Desc, key: '' })

  return {
    getUserVariables: {
      pageSize: itemsPerPage,
      pageNumber: pageNumber,
      sortBy: sort?.key,
      sortDirection: sort?.direction,
      searchTerm: searchValue, // searches only by userName. This is handled with local state, not redux.
      statusFilter: blockStatus as UserBlockStatus,
    },
    sort,
    setSort,
  }
}
