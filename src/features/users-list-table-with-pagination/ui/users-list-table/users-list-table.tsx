import React from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'

import {
  DropdownMenu,
  NewTable,
  TableSkeleton,
  TBody,
  TCell,
  Text,
  TRow,
} from '../../../../shared/ui'

import s from './users-list-table.module.scss'

import { User } from '@/__generated__/graphql'
import {
  setBanModalOpenStatus,
  setDeleteModalOpenStatus,
  setSelectedUser,
  setUnbanModalOpenStatus,
} from '@/features/super-admin-user-management/model/user-management-slice'
import { BannedIcon } from '@/shared/assets/icons'
import DeleteUserIcon from '@/shared/assets/icons/delete-user/delete-user-icon'
import { ThreeDots } from '@/shared/assets/icons/three-dots/icon/three-dots'
import { RoutersPath } from '@/shared/constants/paths'
import { SortType, TableHeader } from '@/shared/ui/table/table'

type UsersListTableType = {
  users: User[]
  handleSort: (sort: SortType) => void
  sort: SortType
  skeletonRowsNum: number
}

export const UsersListTable = ({
  users,
  sort,
  handleSort,
  skeletonRowsNum,
}: UsersListTableType) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  const columns = [
    {
      key: 'id',
      title: t('UserListTable.UserID'),
      sortable: false,
    },
    {
      key: 'name',
      title: t('UserListTable.Name'),
      sortable: false,
    },
    {
      key: 'userName',
      title: t('UserListTable.ProfileLink'),
    },
    {
      key: 'createdAt',
      title: t('UserListTable.CreatedAt'),
    },
  ]

  const openBanModal = (user: User) => {
    dispatch(setBanModalOpenStatus(true))
    dispatch(setSelectedUser(user))
  }

  const openUnbanModal = (user: User) => {
    dispatch(setUnbanModalOpenStatus(true))
    dispatch(setSelectedUser(user))
  }

  const openDeleteUserModal = (user: User) => {
    dispatch(setDeleteModalOpenStatus(true))
    dispatch(setSelectedUser(user))
  }

  return (
    <>
      <NewTable>
        <TableHeader columns={columns} sort={sort} onSort={handleSort} />
        <TBody>
          {!users && <TableSkeleton numRows={skeletonRowsNum} />}
          {users.map(user => {
            return (
              <TRow key={user.id}>
                <TCell>{user.id}</TCell>
                <TCell>
                  {user.profile.firstName} {user.profile.lastName}
                </TCell>
                <TCell>
                  <Link
                    className={s.profileLink}
                    href={RoutersPath.superAdminUserProfile + '/' + user.id}
                  >
                    {user.userName}
                  </Link>
                </TCell>
                <TCell>{new Date(user.createdAt).toLocaleDateString()}</TCell>
                <TCell>
                  <div className={s.iconsContainer}>
                    <DropdownMenu triggerIcon={<ThreeDots />}>
                      <RDropdownMenu.Item
                        onSelect={e => {
                          e.preventDefault()
                        }}
                        className={s.DropdownMenuItem}
                      >
                        icon + text
                      </RDropdownMenu.Item>
                      <RDropdownMenu.Item
                        onSelect={() => openBanModal(user)}
                        className={s.DropdownMenuItem}
                      >
                        <BannedIcon width={24} height={24} />
                        <Text>{t('Admin.BanInSystem')}</Text>
                      </RDropdownMenu.Item>
                      <RDropdownMenu.Item
                        onSelect={() => openUnbanModal(user)}
                        className={s.DropdownMenuItem}
                      >
                        <ThreeDots />
                        <Text>{t('Admin.UnbanUser')}</Text>
                      </RDropdownMenu.Item>
                      <RDropdownMenu.Item
                        onSelect={() => openDeleteUserModal(user)}
                        className={s.DropdownMenuItem}
                      >
                        <DeleteUserIcon />
                        <Text>{t('Admin.DeleteUser')}</Text>
                      </RDropdownMenu.Item>
                    </DropdownMenu>
                  </div>
                </TCell>
              </TRow>
            )
          })}
        </TBody>
      </NewTable>
    </>
  )
}
