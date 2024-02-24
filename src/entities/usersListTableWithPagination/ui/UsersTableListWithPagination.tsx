import React from 'react'

import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'

import { UsersListTable } from '@/entities/usersListTableWithPagination/ui/usersListTable/UsersListTable'
import { GET_USERS_LIST } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import { setPageNumber, setPageSize } from '@/pages/super-admin/modal/slices/admin-reducer'
import { useGetUserVariables } from '@/shared/hooks/useGetUserVariables'
import { Pagination } from '@/shared/ui'
import { SortType } from '@/shared/ui/_table/Table'

export const UsersTableListWithPagination = () => {
  const dispatch = useDispatch()
  const { getUserVariables, sort, setSort } = useGetUserVariables()

  const { data: usersTableData } = useQuery(GET_USERS_LIST, {
    variables: getUserVariables,
    context: {
      headers: {
        Authorization: `Basic ${getAdminBasicCredentials()}`,
      },
    },
  })

  if (!usersTableData) return null

  const handleSetItemsPerPage = (numOfItemsPerPage: number) => {
    dispatch(setPageNumber(1))
    dispatch(setPageSize(Number(numOfItemsPerPage)))
  }

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPageNumber(pageNumber))
  }
  const handleSort = (sort: SortType) => {
    setSort(sort)
  }

  return (
    <>
      <UsersListTable
        skeletonRowsNum={usersTableData.getUsers.pagination.pageSize}
        users={usersTableData.getUsers.users}
        handleSort={handleSort}
        sort={sort}
      />
      <Pagination
        handlePageChange={handlePageChange}
        totalPages={usersTableData.getUsers.pagination.pagesCount}
        totalCount={usersTableData.getUsers.pagination.totalCount}
        itemsPerPage={usersTableData.getUsers.pagination.pageSize}
        currentPage={getUserVariables.pageNumber}
        handleSetItemsPerPage={handleSetItemsPerPage}
        selectOptions={selectOptionsOfDecksToDisplay}
      />
    </>
  )
}
const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']
