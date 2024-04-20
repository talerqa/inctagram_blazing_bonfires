import React from 'react'

import Image from 'next/image'

import s from './all-subscription-payments-table.module.scss'

import { SubscriptionPaymentsModel } from '@/__generated__/graphql'
import { convertTimeUnitToDays, formatDate } from '@/shared/libs/format-dates/format-dates'
import { CircularLoader, NewTable, TableSkeleton, TBody, TCell, TRow } from '@/shared/ui'
import { SortType, TableHeader } from '@/shared/ui/table/table'

type UsersListTableType = {
  users: SubscriptionPaymentsModel[]
  handleSort: (sort: SortType) => void
  sort: SortType
  skeletonRowsNum: number
  columns: any
}

export const AllSubscriptionPaymentsTable = ({
  users,
  sort,
  handleSort,
  skeletonRowsNum,
  columns,
}: UsersListTableType) => {
  return (
    <NewTable>
      {!users && <CircularLoader />}
      <TableHeader columns={columns} sort={sort} onSort={handleSort} />
      <TBody>
        {!users && <TableSkeleton numRows={skeletonRowsNum} />}
        {users.map(user => {
          return (
            <TRow key={user.id}>
              <TCell>
                <div className={s.avatarWithUsernameContainer}>
                  <Image
                    src={user?.avatars?.[0]?.url ?? ''}
                    width={36}
                    height={36}
                    alt={'avatar'}
                    className={s.avatar}
                  />
                  <p>{user.userName}</p>
                </div>
              </TCell>
              <TCell> {formatDate(user.createdAt, 'dd.mm.yyyy')}</TCell>
              <TCell>{user.amount}</TCell>
              <TCell>{convertTimeUnitToDays(user.type)}</TCell>
              <TCell>{user.paymentMethod}</TCell>
            </TRow>
          )
        })}
      </TBody>
    </NewTable>
  )
}
