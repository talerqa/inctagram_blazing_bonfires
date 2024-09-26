import React, { ChangeEvent, useEffect } from 'react'

import NextImage from 'next/image'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'

import s from './user-ban-modal.module.scss'

import { NewPostModal } from '@/features/create-post/ui/'
import { useBanUserMutation } from '@/features/super-admin-user-management/lib/handle-user-ban'
import {
  selectBanModalOpenStatus,
  selectSelectedUser,
  selectUserBlockReason,
  setBanModalOpenStatus,
  setUsersBlockReason,
} from '@/features/super-admin-user-management/model/user-management-slice'
import closeIcon from '@/shared/assets/icons/icons/close-icon.svg'
import { Button, ButtonTheme, Input, InputType, RadixSelect, Text } from '@/shared/ui'

export const UserBanModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const user = useSelector(selectSelectedUser)
  const isOpen = useSelector(selectBanModalOpenStatus)
  const banningReason = useSelector(selectUserBlockReason)
  const handleBanUser = useBanUserMutation()

  const handleSetUsersBlockReason = (selectedReasonToBan: string) => {
    const anotherReasonIsSelected = banningReason.startsWith(t('Admin.AnotherReason'))

    if (anotherReasonIsSelected) {
      dispatch(setUsersBlockReason(selectedReasonToBan + ' ' + banningReason))
    } else {
      dispatch(setUsersBlockReason(selectedReasonToBan))
    }
  }

  const handleSetOtherReasonToBan = (e: ChangeEvent<HTMLInputElement>) => {
    // add explanation for 'other reason' ban selection
    dispatch(setUsersBlockReason(t('Admin.AnotherReason') + ' ' + e.target.value))
  }

  useEffect(() => {
    if (!isOpen) {
      // Reset the ban reason when the modal is closed
      dispatch(setUsersBlockReason(t('NotSelected')))
    }
  }, [isOpen, dispatch])

  const banReasons = [
    t('Admin.BadBehaviour'),
    t('Admin.AdvertisingPlacement'),
    t('Admin.AnotherReason'),
  ]

  return (
    <NewPostModal
      isOpen={isOpen}
      setIsOpen={value => dispatch(setBanModalOpenStatus(value))}
      title={t('Admin.BanUser')}
      right={
        <NextImage
          className={s.closeIcon}
          src={closeIcon}
          alt={''}
          onClick={() => dispatch(setBanModalOpenStatus(false))}
        />
      }
    >
      <div className={s.modalContentWrapper}>
        <Text size={'regular'}>
          {t('Admin.AreYouSureYouWantToBan')} <b>{user?.userName}</b>?
        </Text>

        <div className={s.btnsAndSelectContainer}>
          <RadixSelect
            onChangeOption={handleSetUsersBlockReason}
            options={banReasons}
            placeholder={t('Admin.ReasonForBan')}
            className={s.select}
          />
          {banningReason.startsWith(t('Admin.AnotherReason')) && (
            <Input
              placeholder={t('Admin.AddReason')}
              type={InputType.TEXT}
              onChange={handleSetOtherReasonToBan}
            />
          )}
          <div className={s.btns}>
            <Button
              theme={ButtonTheme.CLEAR}
              className={s.button}
              onClick={() => dispatch(setBanModalOpenStatus(false))}
            >
              {t('No')}
            </Button>
            <Button
              className={s.button}
              onClick={() => {
                handleBanUser(banningReason, user)
                dispatch(setBanModalOpenStatus(false))
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
