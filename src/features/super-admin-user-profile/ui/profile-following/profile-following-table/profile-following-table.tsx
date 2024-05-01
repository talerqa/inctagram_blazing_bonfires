import React from 'react'

import Link from 'next/link'

import { Subscription } from '@/__generated__/graphql'
import s from '@/features/users-list-table-with-pagination/ui/users-list-table/users-list-table.module.scss'
import { RoutersPath } from '@/shared/constants/paths'
import { NewTable, TableSkeleton, TBody, TCell, TRow } from '@/shared/ui'
import { SortType, TableHeader } from '@/shared/ui/table/table'
import { findDate } from '@/shared/utils'

type ProfileFollowingTableType = {
  items: Subscription[]
  handleSort: (sort: SortType) => void
  sort: SortType
  skeletonRowsNum: number
  columns: any
}

export const ProfileFollowingTable = ({
  items,
  sort,
  handleSort,
  skeletonRowsNum,
  columns,
}: ProfileFollowingTableType) => {
  return (
    <NewTable>
      <TableHeader columns={columns} sort={sort} onSort={handleSort} />
      {!items && <TableSkeleton numRows={skeletonRowsNum} />}
      <TBody>
        {items?.map(item => {
          return (
            <TRow key={item.id}>
              <TCell>{item.userId}</TCell>
              <TCell>{item.userName}</TCell>
              <TCell>
                <Link
                  className={s.profileLink}
                  href={RoutersPath.superAdminUserProfile + '/' + item.userId}
                  style={{ textDecoration: 'underline' }}
                >
                  {item.userName}
                </Link>
              </TCell>
              <TCell>{findDate.formatToNumeric(item.createdAt)}</TCell>
            </TRow>
          )
        })}
      </TBody>
    </NewTable>
  )
}
