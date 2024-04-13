import React from 'react'

import NextImage from 'next/image'
import router from 'next/router'

import style from '../search.module.scss'

import { UserType } from '@/shared/api/services/search/users.api.types'
import mockupPhoto from '@/shared/assets/icons/avatar-profile/not-photo.png'
import { RoutersPath } from '@/shared/constants/paths'
import { Text } from '@/shared/ui'

type Props = {
  user: UserType
}

const UserItem = ({ user }: Props) => {
  const onUserClick = () => {
    if (typeof localStorage !== 'undefined')
      if (localStorage.getItem('recentRequestUsers')) {
        const usersArray = JSON.parse(localStorage.getItem('recentRequestUsers') as string)

        usersArray.push(user)
        localStorage.setItem('recentRequestUsers', JSON.stringify(usersArray))
      } else {
        localStorage.setItem('recentRequestUsers', JSON.stringify([user]))
      }

    router.push(`${RoutersPath.profile}/${user.id}`)
  }
  const avatar = user?.avatars[1]?.url || mockupPhoto

  return (
    <div className={style.userItemWrapper} onClick={onUserClick}>
      <div className={style.avatar}>
        {avatar && <NextImage src={avatar} width={48} height={48} alt={'user-photo'} />}
      </div>
      <div className={style.userInfo}>
        <Text as={'p'} size={'medium'} weight={'bold'} className={style.userName}>
          {user.userName}
        </Text>
        <Text as={'p'} size={'medium'} className={style.userFirstName}>
          {user.firstName}
        </Text>
      </div>
    </div>
  )
}

export default UserItem
