import { useQuery } from '@apollo/client'

import { GET_FOLLOWING_USERS } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import { GetUserVariablesType } from '@/shared/hooks/use-get-user-variables'

export function getFollowingUsersData(
  { statusFilter, searchTerm, ...sortAndPaginationData }: GetUserVariablesType,
  selectedUserId: number
) {
  const { data: userFollowing } = useQuery(GET_FOLLOWING_USERS, {
    variables: {
      userId: selectedUserId,
      ...sortAndPaginationData,
    },
    context: {
      headers: {
        Authorization: `Basic ${getAdminBasicCredentials()}`,
      },
    },
  })

  return userFollowing
}
