import React, { useRef } from 'react'

import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDispatch } from 'react-redux'

import s from './usersLists.module.scss'

import { UsersTableListWithPagination } from '@/entities/usersListTableWithPagination/ui/UsersTableListWithPagination'
import { UserBanModal } from '@/features/user-management'
import {
  setBlockStatus,
  setSearchParameter,
} from '@/features/user-management/model/userManagementSlice'
import { UserDeleteModal } from '@/features/user-management/ui/user-delete-modal/UserDeleteModal'
import { UnbanUserModal } from '@/features/user-management/ui/user-unban-modal/UnbanUserModal'
import { handleInputChange } from '@/pages/super-admin/lib/utils/utils'
import { getAdminLayout } from '@/shared/layouts/adminLayout/AdminLayout'
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
  }
  const { t } = useTranslation('common', { keyPrefix: 'UserListTable' })
  const selectOptions = [t('NotBlocked'), t('Blocked')]

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
