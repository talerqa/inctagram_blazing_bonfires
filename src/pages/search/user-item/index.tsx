import React from 'react'

import style from '../search.module.scss'

import { userType } from '@/shared/api/services/search/users.api.types'

type Props = {
  user: userType
}
const UserItem = ({ user }: Props) => {
  return (
    <div className={style.userItemWrapper}>
      <div className={style.avatar} />
      <div>
        <p color={'light'}>{user.userName}</p>
        <p color={'light'}>{user.firstName}</p>
      </div>
    </div>
  )
}

export default UserItem
