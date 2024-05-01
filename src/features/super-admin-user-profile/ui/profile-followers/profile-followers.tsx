import React from 'react'

import { useDispatch } from 'react-redux'

import { getFollowersUsersData } from '@/features/super-admin-user-profile/lib/get-followers-table-data'
import { getUserFollowersColumns } from '@/features/super-admin-user-profile/ui/profile-followers/constants'
import { ProfileFollowersTable } from '@/features/super-admin-user-profile/ui/profile-followers/profile-followers-table/profile-followers-table'
import { setPageNumber, setPageSize } from '@/pages/super-admin/modal/slices/admin-reducer'
import { useGetProfileFollowersQuery } from '@/shared/api/services/profile/profile.api'
import { GetUserVariablesType, useGetUserVariables } from '@/shared/hooks/use-get-user-variables'
import { CircularLoader, Pagination } from '@/shared/ui'
import { SortType } from '@/shared/ui/table/table'

export const ProfileFollowers = ({ userId }: { userId: number }) => {
  const dispatch = useDispatch()
  const { getUserVariables, sort, setSort } = useGetUserVariables()
  const followersData = getFollowersUsersData(getUserVariables as GetUserVariablesType, userId)
  // const { data: followers } = useGetProfileFollowersQuery({ userName: 'dezo103' })

  console.log(followersData, 'followersData')
  // FIXME: Currently cannot access backend endpoints, since cannot access public endpoints with Admin basic authorization
  const columns = getUserFollowersColumns()

  if (!followersData) return <CircularLoader />

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
      <ProfileFollowersTable
        skeletonRowsNum={followersData.getFollowing.pageSize}
        items={followersData.getFollowing.items}
        handleSort={handleSort}
        sort={sort}
        columns={columns}
      />
      <Pagination
        handlePageChange={handlePageChange}
        totalPages={followersData.getFollowing.pagesCount}
        totalCount={followersData.getFollowing.totalCount}
        itemsPerPage={followersData.getFollowing.pageSize}
        currentPage={getUserVariables.pageNumber}
        handleSetItemsPerPage={handleSetItemsPerPage}
        selectOptions={selectOptionsOfDecksToDisplay}
      />
      followersData
    </>
  )
}
const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']
