import React from 'react'

import NextImage from 'next/image'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'

import s from './user-delete-modal.module.scss'

import { NewPostModal } from '@/features/create-post/ui/new-post-modal/new-post-modal'
import { useDeleteUserMutation } from '@/features/super-admin-user-management/lib/handle-user-delete'
import {
  selectDeleteModalOpenStatus,
  selectSelectedUser,
  setDeleteModalOpenStatus,
} from '@/features/super-admin-user-management/model/user-management-slice'
import closeIcon from '@/shared/assets/icons/icons/close-icon.svg'
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
      title={t('Admin.DeleteUser')}
      right={
        <NextImage
          className={s.closeIcon}
          src={closeIcon}
          alt={''}
          onClick={() => dispatch(setDeleteModalOpenStatus(false))}
        />
      }
    >
      <div className={s.modalContentWrapper}>
        <Text className={s.text}>
          {t('Admin.AreYouSureYouWantDeleteUser')} <b>{user?.userName}</b> ?
        </Text>

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
