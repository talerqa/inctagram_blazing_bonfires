import React from 'react'

import NextImage from 'next/image'

import style from '../search.module.scss'

import { userType } from '@/shared/api/services/search/users.api.types'
import mockupPhoto from '@/shared/assets/icons/avatar-profile/not-photo.png'
import { Text } from '@/shared/ui'

type Props = {
  user: userType
}

const UserItem = ({ user }: Props) => {
  // console.log(user.avatars[1].url)

  return (
    <div className={style.userItemWrapper}>
      <div className={style.avatar}>
        <NextImage
          src={user.avatars.length > 0 ? user.avatars[1].url : mockupPhoto}
          width={48}
          height={48}
          alt={'user-photo'}
        />
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
