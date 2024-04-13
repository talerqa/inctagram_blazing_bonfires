import React, { useRef } from 'react'

import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDispatch } from 'react-redux'

import s from './users-lists.module.scss'

import {
  UnbanUserModal,
  UserBanModal,
  UserDeleteModal,
} from '@/features/super-admin-user-management'
import {
  setBlockStatus,
  setSearchParameter,
} from '@/features/super-admin-user-management/model/user-management-slice'
import { UsersTableListWithPagination } from '@/features/users-list-table-with-pagination/ui/users-table-list-with-pagination'
import { handleInputChange } from '@/pages/super-admin/lib/utils/utils'
import { setPageNumber } from '@/pages/super-admin/modal/slices/admin-reducer'
import { getAdminLayout } from '@/shared/layouts/admin-layout/admin-layout'
import { Input, InputType, RadixSelect } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const UsersList = () => {
  const dispatch = useDispatch()

  const inputValue = useRef<HTMLInputElement | null>(null)

  const handleSearch = handleInputChange(
    (value: string) => dispatch(setSearchParameter(value)),
    500
  )

  const handleBlockStatusChange = (blockStatus: BlockedStatusType) => {
    dispatch(setBlockStatus(blockStatus))
    dispatch(setPageNumber(1))
  }
  const { t } = useTranslation('common', { keyPrefix: 'UserListTable' })
  const selectOptions = [
    { label: t('NotBlocked'), value: 'UNBLOCKED' },
    { label: t('Blocked'), value: 'BLOCKED' },
  ]

  return (
    <div className={s.usersListPage}>
      <div className={s.inputAndSelect}>
        <Input
          ref={inputValue}
          type={InputType.SEARCH}
          className={s.search}
          placeholder={t('Search')}
          onChange={handleSearch}
        />
        <div className={s.iconsContainer}>
          <RadixSelect
            className={s.triggerBtn}
            onChangeOption={handleBlockStatusChange}
            options={selectOptions}
            placeholder={t('NotSelected')}
          />
        </div>
      </div>
      <UsersTableListWithPagination />
      <UserBanModal />
      <UnbanUserModal />
      <UserDeleteModal />
    </div>
  )
}

export type BlockedStatusType = 'Blocked' | 'Not Blocked'

UsersList.getLayout = getAdminLayout
export default UsersList
