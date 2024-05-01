import React from 'react'

import { useDispatch } from 'react-redux'

import { getFollowingUsersData } from '@/features/super-admin-user-profile/lib/get-following-table-data'
import { getUserFollowersColumns } from '@/features/super-admin-user-profile/ui/profile-followers/constants'
import { ProfileFollowingTable } from '@/features/super-admin-user-profile/ui/profile-following/profile-following-table/profile-following-table'
import { setPageNumber, setPageSize } from '@/pages/super-admin/modal/slices/admin-reducer'
import { GetUserVariablesType, useGetUserVariables } from '@/shared/hooks/use-get-user-variables'
import { CircularLoader, Pagination } from '@/shared/ui'
import { SortType } from '@/shared/ui/table/table'

export const ProfileFollowing = ({ userId }: { userId: number }) => {
  const dispatch = useDispatch()
  const { getUserVariables, sort, setSort } = useGetUserVariables()
  const followingData = getFollowingUsersData(getUserVariables as GetUserVariablesType, userId)

  const columns = getUserFollowersColumns()

  if (!followingData) return <CircularLoader />

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
      <ProfileFollowingTable
        skeletonRowsNum={followingData.getFollowing.pageSize}
        items={followingData.getFollowing.items}
        handleSort={handleSort}
        sort={sort}
        columns={columns}
      />
      <Pagination
        handlePageChange={handlePageChange}
        totalPages={followingData.getFollowing.pagesCount}
        totalCount={followingData.getFollowing.totalCount}
        itemsPerPage={followingData.getFollowing.pageSize}
        currentPage={getUserVariables.pageNumber}
        handleSetItemsPerPage={handleSetItemsPerPage}
        selectOptions={selectOptionsOfDecksToDisplay}
      />
    </>
  )
}
const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']
