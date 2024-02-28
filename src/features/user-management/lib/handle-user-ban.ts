import { useMutation } from '@apollo/client'

import { User } from '@/__generated__/graphql'
import { setUsersBlockReason } from '@/features/user-management/model/user-management-slice'
import { BAN_USER } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'

export function useBanUserMutation() {
  const [banUser] = useMutation(BAN_USER)

  const handleBanUser = (banReason: string, user: User | null) => {
    banUser({
      variables: {
        banReason,
        userId: user?.id || 0,
      },
      context: {
        headers: {
          Authorization: `Basic ${getAdminBasicCredentials()}`,
        },
      },
    })
  }

  return handleBanUser
}
