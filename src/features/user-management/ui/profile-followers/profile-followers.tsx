import React from 'react'

import { useDispatch } from 'react-redux'

import { getUserFollowersColumns } from '@/features/user-management/ui/profile-followers/constants'
import { setPageNumber, setPageSize } from '@/pages/super-admin/modal/slices/admin-reducer'
import { useGetProfileFollowersQuery } from '@/shared/api/services/profile/profile.api'
import { useGetUserVariables } from '@/shared/hooks/use-get-user-variables'
import { CircularLoader } from '@/shared/ui'
import { SortType } from '@/shared/ui/table/table'

export const ProfileFollowers = ({ userId }: { userId: number }) => {
  const dispatch = useDispatch()
  const { getUserVariables, sort, setSort } = useGetUserVariables()
  // const followers = getUserFollowersData(userId)
  const { data: followers } = useGetProfileFollowersQuery({ userName: 'tutimya' })
  // FIXME: Currently cannot access backend endpoints, since cannot access public endpoints with Admin basic authorization
  const columns = getUserFollowersColumns()

  if (!followers) return <CircularLoader />

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
      {/*<ProfileFollowersTable*/}
      {/*  skeletonRowsNum={followers.pageSize}*/}
      {/*  items={followers.items}*/}
      {/*  handleSort={handleSort}*/}
      {/*  sort={sort}*/}
      {/*  columns={columns}*/}
      {/*/>*/}
      {/*<Pagination*/}
      {/*  handlePageChange={handlePageChange}*/}
      {/*  totalPages={followers.pagesCount}*/}
      {/*  totalCount={followers.totalCount}*/}
      {/*  itemsPerPage={followers.pageSize}*/}
      {/*  currentPage={getUserVariables.pageNumber}*/}
      {/*  handleSetItemsPerPage={handleSetItemsPerPage}*/}
      {/*  selectOptions={selectOptionsOfDecksToDisplay}*/}
      {/*/>*/}
    </>
  )
}
const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']
