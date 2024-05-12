import { useQuery } from '@apollo/client'

import { GET_ALL_SUBSCRIPTION_PAYMENTS } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import { GetUserVariablesType } from '@/shared/hooks/use-get-user-variables'

export function getAllSubscriptionPayments(getUserVariables: GetUserVariablesType) {
  const { data: allSubscriptionPayments, loading } = useQuery(GET_ALL_SUBSCRIPTION_PAYMENTS, {
    variables: getUserVariables,
    context: {
      headers: {
        Authorization: `Basic ${getAdminBasicCredentials()}`,
      },
    },
  })

  return { allSubscriptionPayments, loading }
}
