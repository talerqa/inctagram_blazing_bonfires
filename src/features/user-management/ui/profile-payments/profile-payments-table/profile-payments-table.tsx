import React from 'react'

import Link from 'next/link'

import s from './profile-payments-table.module.scss'

import { Subscription } from '@/__generated__/graphql'
import { RoutersPath } from '@/shared/constants/paths'
import { NewTable, TableSkeleton, TBody, TCell, TRow } from '@/shared/ui'
import { SortType, TableHeader } from '@/shared/ui/table/table'
import { capitalizeString, findDate } from '@/shared/utils'

type ProfilePaymentsTableType = {
  items: Subscription[]
  handleSort: (sort: SortType) => void
  sort: SortType
  skeletonRowsNum: number
  columns: any
}

export const ProfilePaymentsTable = ({
  items,
  sort,
  handleSort,
  skeletonRowsNum,
  columns,
}: ProfilePaymentsTableType) => {
  return (
    <NewTable>
      <TableHeader columns={columns} sort={sort} onSort={handleSort} />
      <TBody>
        {!items && <TableSkeleton numRows={skeletonRowsNum} />}
        {items.map(item => {
          return (
            <TRow key={item.id}>
              <TCell>{findDate.formatToNumeric(item.dateOfPayment)}</TCell>
              <TCell>{findDate.formatToNumeric(item.endDate)}</TCell>
              <TCell>
                <Link
                  className={s.profileLink}
                  href={RoutersPath.superAdminUserProfile + '/' + item.id}
                >
                  {item.price}
                </Link>
              </TCell>
              <TCell>{item.type}</TCell>
              <TCell>{capitalizeString(item.paymentType)}</TCell>
            </TRow>
          )
        })}
      </TBody>
    </NewTable>
  )
}
