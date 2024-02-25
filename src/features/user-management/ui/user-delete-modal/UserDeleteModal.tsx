import React from 'react'

import NextImage from 'next/image'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'

import s from './UserDeleteModal.module.scss'

import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import { useDeleteUserMutation } from '@/features/user-management/lib/handle-user-delete'
import {
  selectDeleteModalOpenStatus,
  selectSelectedUser,
  setDeleteModalOpenStatus,
} from '@/features/user-management/model/userManagementSlice'
import closeIcon from '@/shared/assets/icons/icons/closeIcon.svg'
import { Button, ButtonTheme, Text } from '@/shared/ui'

export const UserDeleteModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const user = useSelector(selectSelectedUser)
  const isOpen = useSelector(selectDeleteModalOpenStatus)
  const handleDeleteUser = useDeleteUserMutation()

  return (
    <NewPostModal
      isOpen={isOpen}
      setIsOpen={value => dispatch(setDeleteModalOpenStatus(value))}
      title={'Delete user'}
      right={
        <NextImage
          style={{ cursor: 'pointer' }}
          src={closeIcon}
          alt={''}
          onClick={() => dispatch(setDeleteModalOpenStatus(false))}
        />
      }
    >
      <div className={s.modalContentWrapper}>
        <div className={s.textWrapper}>
          <Text className={s.text}>
            Are you sure to delete user <b>{user?.userName}</b> ?
          </Text>
        </div>

        <div className={s.btnsContainer}>
          <div className={s.btns}>
            <Button
              theme={ButtonTheme.CLEAR}
              className={s.button}
              onClick={() => dispatch(setDeleteModalOpenStatus(false))}
            >
              {t('No')}
            </Button>
            <Button
              className={s.button}
              onClick={() => {
                handleDeleteUser(user)
                dispatch(setDeleteModalOpenStatus(false))
              }}
            >
              {t('Yes')}
            </Button>
          </div>
        </div>
      </div>
    </NewPostModal>
  )
}
