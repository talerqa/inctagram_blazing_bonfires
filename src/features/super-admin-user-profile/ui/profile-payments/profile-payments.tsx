import React from 'react'

import { useDispatch } from 'react-redux'

import { getPaymentsColumnHeaders } from './constants'

import { getUserPaymentsData } from '@/features/super-admin-user-profile/lib/get-payments-table-data'
import { ProfilePaymentsTable } from '@/features/super-admin-user-profile/ui/profile-payments/profile-payments-table/profile-payments-table'
import { setPageNumber, setPageSize } from '@/pages/super-admin/modal/slices/admin-reducer'
import { GetUserVariablesType, useGetUserVariables } from '@/shared/hooks/use-get-user-variables'
import { CircularLoader, Pagination } from '@/shared/ui'
import { SortType } from '@/shared/ui/table/table'

export const ProfilePayments = ({ userId }: { userId: number }) => {
  const dispatch = useDispatch()
  const { getUserVariables, sort, setSort } = useGetUserVariables()
  const paymentsData = getUserPaymentsData(getUserVariables as GetUserVariablesType, userId)
  const columns = getPaymentsColumnHeaders()

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
