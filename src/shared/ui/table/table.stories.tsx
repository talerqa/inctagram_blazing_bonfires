import { ComponentPropsWithoutRef, FC, useMemo, useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Table, TBody, TCell, THead, THeader, TRow } from './table'

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
  },
  component: Table,
  tags: ['autodocs'],
  title: 'UI/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const data = [
  {
    title: 'Project A',
    cardsCount: 10,
    updated: '2023-07-07',
    createdBy: 'John Doe',
  },
  {
    title: 'Project B',
    cardsCount: 5,
    updated: '2023-07-06',
    createdBy: 'Jane Smith',
  },
  {
    title: 'Project C',
    cardsCount: 8,
    updated: '2023-07-05',
    createdBy: 'Alice Johnson',
  },
  {
    title: 'Project D',
    cardsCount: 3,
    updated: '2023-07-07',
    createdBy: 'Bob Anderson',
  },
  {
    title: 'Project E',
    cardsCount: 12,
    updated: '2023-07-04',
    createdBy: 'Emma Davis',
  },
]

type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export const Default: Story = {
  args: {
    title: 'Table',
  },
}

export type Column = {
  key: string
  sortable?: boolean
  title: string
}

const columns: Array<Column> = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    title: 'Created by',
  },
]

export const WithSort = {
  render: () => {
    const [sort, setSort] = useState<Sort>(null)

    return (
      <Table>
        <TableHeader columns={columns} sort={sort} onSort={setSort} />
        <TBody>
          {data.map(item => (
            <TRow key={item.title}>
              <TCell>{item.title}</TCell>
              <TCell>{item.cardsCount}</TCell>
              <TCell>{item.updated}</TCell>
              <TCell>{item.createdBy}</TCell>
              <TCell>icons...</TCell>
            </TRow>
          ))}
        </TBody>
      </Table>
    )
  },
}

export const TableHeader: FC<
  Omit<
    ComponentPropsWithoutRef<'thead'> & {
      columns: Column[]
      onSort?: (sort: Sort) => void
      sort?: Sort
    },
    'children'
  >
> = ({ columns, onSort, sort, ...restProps }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }

    if (sort.direction === 'desc') {
      return onSort(null)
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  return (
    <THead {...restProps}>
      <TRow>
        {columns.map(({ key, sortable = true, title }) => (
          <THeader key={key} onClick={handleSort(key, sortable)}>
            {title}
            {sort && sort.key === key && <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>}
          </THeader>
        ))}
        <THeader />
      </TRow>
    </THead>
  )
}
