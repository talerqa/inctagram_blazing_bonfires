import React from 'react'

import { Subscription, SubscriptionType } from '@/__generated__/graphql'
import { convertTimeUnitToDays } from '@/shared/libs/format-dates/format-dates'
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
              <TCell>{item.price}</TCell>
              <TCell>{convertTimeUnitToDays(item.type)}</TCell>
              <TCell>{capitalizeString(item.paymentType)}</TCell>
            </TRow>
          )
        })}
      </TBody>
    </NewTable>
  )
}
