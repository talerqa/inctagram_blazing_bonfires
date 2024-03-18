import React from 'react'

import { useMutation } from '@apollo/client'
import NextImage from 'next/image'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'

import s from './unban-user-modal.module.scss'

import { User } from '@/__generated__/graphql'
import { NewPostModal } from '@/features/create-post/ui/new-post-modal/new-post-modal'
import {
  selectBanModalOpenStatus,
  selectSelectedUser,
  selectUnbanModalOpenStatus,
  setBanModalOpenStatus,
  setUnbanModalOpenStatus,
} from '@/features/super-admin-user-management/model/user-management-slice'
import { UNBAN_USER } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import closeIcon from '@/shared/assets/icons/icons/close-icon.svg'
import { Button, ButtonTheme, Text } from '@/shared/ui'

export const UnbanUserModal = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const user = useSelector(selectSelectedUser)
  const isOpen = useSelector(selectUnbanModalOpenStatus)
  const [unbanUser] = useMutation(UNBAN_USER)

  const handleUnbanUser = () => {
    unbanUser({
      variables: {
        userId: user?.id || 0,
      },
      context: {
        headers: {
          Authorization: `Basic ${getAdminBasicCredentials()}`,
        },
      },
    })
    dispatch(setUnbanModalOpenStatus(false))
  }

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
        <div className={s.textWrapper}>
          <Text className={s.text}>
            {t('Admin.AreYouSureYouWantToUnban')}, <b>{user?.userName}</b> ?
          </Text>
        </div>

        <div className={s.btnsAndSelectContainer}>
          <div className={s.btns}>
            <Button
              theme={ButtonTheme.CLEAR}
              className={s.button}
              onClick={() => dispatch(setUnbanModalOpenStatus(false))}
            >
              {t('No')}
            </Button>
            <Button className={s.button} onClick={handleUnbanUser}>
              {t('Yes')}
            </Button>
          </div>
        </div>
      </div>
    </NewPostModal>
  )
}
