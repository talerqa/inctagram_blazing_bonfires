import { useDispatch } from 'react-redux'

import s from './table-with-pagination-container.module.scss'

import { getAllSubscriptionPayments } from '@/features/all-subscription-payments-table-with-pagination/lib/get-all-subscription-payments'
import { AllSubscriptionPaymentsTable } from '@/features/all-subscription-payments-table-with-pagination/ui/all-subscription-payments-table/all-subscription-payments-table'
import { getAllSubscriptionPaymentsColumnHeaders } from '@/features/all-subscription-payments-table-with-pagination/ui/constants'
import {
  setAdminLoading,
  setPageNumber,
  setPageSize,
} from '@/pages/super-admin/modal/slices/admin-reducer'
import { GetUserVariablesType, useGetUserVariables } from '@/shared/hooks/use-get-user-variables'
import { Pagination, TableSkeleton } from '@/shared/ui'
import { SortType } from '@/shared/ui/table/table'

export const AllSubscriptionPaymentsTableWithPagination = () => {
  const dispatch = useDispatch()
  const { getUserVariables, sort, setSort } = useGetUserVariables()
  const columns = getAllSubscriptionPaymentsColumnHeaders()
  const { allSubscriptionPayments, loading } = getAllSubscriptionPayments(
    getUserVariables as GetUserVariablesType
  )

  if (loading) {
    dispatch(setAdminLoading(true))
  }
  if (!loading) {
    dispatch(setAdminLoading(false))
  }

  if (!allSubscriptionPayments) return <TableSkeleton key="payments10" numRows={10} />

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
      <div className={s.subscriptionPaymentsTableWrapper}>
        <AllSubscriptionPaymentsTable
          skeletonRowsNum={allSubscriptionPayments.getPayments.pageSize}
          users={allSubscriptionPayments.getPayments.items}
          handleSort={handleSort}
          sort={sort}
          columns={columns}
        />
      </div>
      <Pagination
        handlePageChange={handlePageChange}
        totalPages={allSubscriptionPayments.getPayments.pagesCount}
        totalCount={allSubscriptionPayments.getPayments.totalCount}
        itemsPerPage={allSubscriptionPayments.getPayments.pageSize}
        currentPage={getUserVariables.pageNumber}
        handleSetItemsPerPage={handleSetItemsPerPage}
        selectOptions={selectOptionsOfDecksToDisplay}
      />
    </>
  )
}
const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']
