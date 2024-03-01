import React from 'react'

import { useQuery } from '@apollo/client'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'

import { getPaymentsColumns } from './constants'

import { UsersListTable } from '@/entities/users-list-table-with-pagination/ui/users-list-table/users-list-table'
import { getUserPaymentsData } from '@/features/user-management/lib/get-payments-table-data'
import { ProfilePaymentsTable } from '@/features/user-management/ui/profile-payments/profile-payments-table/profile-payments-table'
import {
  GET_USER_PAYMENTS,
  GET_USERS_LIST,
} from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import { setPageNumber, setPageSize } from '@/pages/super-admin/modal/slices/admin-reducer'
import { GetUserVariablesType, useGetUserVariables } from '@/shared/hooks/use-get-user-variables'
import { CircularLoader, Pagination } from '@/shared/ui'
import { SortType } from '@/shared/ui/table/table'

export const ProfilePayments = ({ userId }: { userId: number }) => {
  const dispatch = useDispatch()
  const { getUserVariables, sort, setSort } = useGetUserVariables()
  const paymentsData = getUserPaymentsData(getUserVariables as GetUserVariablesType, userId)
  const columns = getPaymentsColumns()

  if (!paymentsData) return <CircularLoader />

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
      <ProfilePaymentsTable
        skeletonRowsNum={paymentsData.getPaymentsByUser.pageSize}
        items={paymentsData.getPaymentsByUser.items}
        handleSort={handleSort}
        sort={sort}
        columns={columns}
      />
      <Pagination
        handlePageChange={handlePageChange}
        totalPages={paymentsData.getPaymentsByUser.pagesCount}
        totalCount={paymentsData.getPaymentsByUser.totalCount}
        itemsPerPage={paymentsData.getPaymentsByUser.pageSize}
        currentPage={getUserVariables.pageNumber}
        handleSetItemsPerPage={handleSetItemsPerPage}
        selectOptions={selectOptionsOfDecksToDisplay}
      />
    </>
  )
}
const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']
