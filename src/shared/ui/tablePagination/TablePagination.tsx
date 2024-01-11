import React, { ChangeEvent } from 'react'

import { createTheme, ThemeProvider } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import { useTranslation } from 'next-i18next'

import { Select } from '@/shared/ui'
import styles from '@/shared/ui/tablePagination/TablePagination.module.scss'

export type PaginationPropsType = {
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

export const TablePagination: React.FC<PaginationPropsType> = ({
  page,
  itemsCountForPage,
  totalCount,
  onChange,
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'TablePagination' })

  const lastPage = Math.ceil(totalCount / itemsCountForPage)

  const onChangeCallback = (event: ChangeEvent<unknown>, page: number) => {
    onChange(page, itemsCountForPage)
  }

  const onChangeSelect = (id: number) => {
    onChange(page, id)
  }

  const theme = createTheme({
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: '#fff',
            backgroundColor: '#0d0d0d',
            '&.Mui-selected': {
              color: '#000',
              backgroundColor: '#fff',
            },
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.pagination}>
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          page={page}
          count={lastPage}
          onChange={onChangeCallback}
        />

        <div className={styles.container}>
          <span className={styles.text1}>{t('Show')}</span>

          <Select
            value={itemsCountForPage}
            st={{
              width: '52px',
              height: '24px',
              appearance: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#171717',
              border: '1px solid #4c4c4c',
            }}
            options={[
              { id: 1000, value: 1000 },
              { id: 100, value: 100 },
              { id: 10, value: 10 },
            ]}
            onChangeOption={onChangeSelect}
          />

          <span className={styles.text2}>{t('OnPage')}</span>
        </div>
      </div>
    </ThemeProvider>
  )
}
