import { ComponentPropsWithoutRef, FC, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

import { SortDirection } from '@/__generated__/graphql'
import { Sort, SortAsc, SortDesc } from '@/shared/assets/icons'

export const THead = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      thead: clsx(className, s.thead),
    }

    return <thead className={classNames.thead} {...rest} ref={ref}></thead>
  }
)

export const TBody = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, children, ...rest }, ref) => {
    const classNames = {
      tbody: clsx(className, s.tbody),
    }

    return (
      <tbody className={classNames.tbody} {...rest} ref={ref}>
        {children}
      </tbody>
    )
  }
)

export const TRow = forwardRef<HTMLTableRowElement, ComponentPropsWithoutRef<'tr'>>(
  ({ className, children, ...rest }, ref) => {
    const classNames = {
      tr: clsx(className, s.tr),
    }

    return (
      <tr className={classNames.tr} {...rest} ref={ref}>
        {children}
      </tr>
    )
  }
)

export const THeader = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...rest }, ref) => {
    const classNames = { th: clsx(className, s.th) }

    return <th className={classNames.th} {...rest} ref={ref}></th>
  }
)

export const TCell = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...rest }, ref) => {
    const classNames = { td: clsx(className, s.td) }

    return <td className={classNames.td} {...rest} ref={ref}></td>
  }
)

export const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref) => {
    const classNames = {
      table: clsx(className, s.table),
    }

    return <table className={classNames['table']} {...rest} ref={ref}></table>
  }
)

// The forwardRef function allows you to expose
// the ref prop so that parent components can pass
// a ref to the Table component and have it apply that
// ref to the underlying <table> element.
// If you don't use forwardRef and simply expect a ref
// as a regular prop, it won't work in the same way
// because React won't automatically forward the ref
// to the DOM element.

// ComponentPropsWithoutRef<'table'>
// is used to define the allowed props for the Table component,

export type Column = {
  key: string
  sortable?: boolean
  title: string
}

export type SortType = {
  key: string
  direction: SortDirection
} | null

export const TableHeader: FC<
  Omit<
    ComponentPropsWithoutRef<'thead'> & {
      columns: Column[]
      onSort?: (sort: SortType | null) => void
      sort?: SortType
    },
    'children'
  >
> = ({ columns, onSort, sort, ...restProps }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: SortDirection.Asc, key })
    }

    if (sort.direction === SortDirection.Desc) {
      return onSort(null)
    }

    return onSort({
      direction: sort?.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc,
      key,
    })
  }

  return (
    <THead {...restProps}>
      <TRow>
        {columns.map(({ key, sortable = true, title }) => (
          <THeader key={key} onClick={handleSort(key, sortable)} style={{ width: '23%' }}>
            <div className={s.titleAndSortIcon}>
              {title}
              {!sort && sortable && <Sort />}
              {sort && sort.key === key && (
                <span>{sort.direction === SortDirection.Asc ? <SortAsc /> : <SortDesc />}</span>
              )}
            </div>
          </THeader>
        ))}
        <THeader style={{ width: '8%' }} />
      </TRow>
    </THead>
  )
}
