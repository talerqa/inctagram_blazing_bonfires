import React from 'react'

import NextImage from 'next/image'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'

import s from './unban-user-modal.module.scss'

import { NewPostModal } from '@/features/create-post/ui/new-post-modal/new-post-modal'
import { useUnbanUserMutation } from '@/features/super-admin-user-management/lib/handle-user-unban'
import {
  selectSelectedUser,
  selectUnbanModalOpenStatus,
  setUnbanModalOpenStatus,
} from '@/features/super-admin-user-management/model/user-management-slice'
import closeIcon from '@/shared/assets/icons/icons/close-icon.svg'
import { Button, ButtonTheme, Text } from '@/shared/ui'

export const UnbanUserModal = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const user = useSelector(selectSelectedUser)
  const isOpen = useSelector(selectUnbanModalOpenStatus)
  const handleUnbanUser = useUnbanUserMutation()

  return (
    <NewPostModal
      isOpen={isOpen}
      setIsOpen={value => dispatch(setUnbanModalOpenStatus(value))}
      title={t('Admin.UnbanUser')}
      right={
        <NextImage
          style={{ cursor: 'pointer' }}
          src={closeIcon}
          alt={''}
          onClick={() => dispatch(setUnbanModalOpenStatus(false))}
        />
      }
    >
      <div className={s.modalContentWrapper}>
        <Text>
          {t('Admin.AreYouSureYouWantToUnban')} <b>{user?.userName}</b> ?
        </Text>

        <div className={s.btnsContainer}>
          <div className={s.btns}>
            <Button
              theme={ButtonTheme.CLEAR}
              className={s.button}
              onClick={() => dispatch(setUnbanModalOpenStatus(false))}
            >
              {t('No')}
            </Button>
            <Button
              className={s.button}
              onClick={() => {
                handleUnbanUser(user)
                dispatch(setUnbanModalOpenStatus(false))
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
