import { useQuery } from '@apollo/client'

import { GET_USER_PAYMENTS } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import { GetUserVariablesType } from '@/shared/hooks/use-get-user-variables'

export function getUserPaymentsData(
  { statusFilter, searchTerm, ...sortAndPaginationData }: GetUserVariablesType,
  selectedUserId: number
) {
  const { data: userPayments } = useQuery(GET_USER_PAYMENTS, {
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

  return userPayments
}
