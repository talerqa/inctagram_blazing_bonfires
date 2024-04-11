import React from 'react'

import { userType } from '@/shared/api/services/users/users.api.types'

type Props = {
  user: userType
}
const UserItem = ({ user }: Props) => {
  return (
    <div>
      <p color={'light'}>{user.userName}</p>
      <p color={'light'}>{user.firstName}</p>
    </div>
  )
}

export default UserItem
