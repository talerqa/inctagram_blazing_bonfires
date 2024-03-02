import { useState } from 'react'

import { useQuery } from '@apollo/client'
import { useTranslation } from 'next-i18next'

import {
  GET_ALL_SUBSCRIPTION_PAYMENTS,
  GET_USER_PAYMENTS,
} from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import { useGetProfileUserQuery } from '@/shared/api'
import { useGetProfileFollowersQuery } from '@/shared/api/services/profile/profile.api'
import { useGetPublicProfileQuery } from '@/shared/api/services/public/public.api'
import { PublicProfileType } from '@/shared/api/services/public/public.api.types'
import { GetUserVariablesType } from '@/shared/hooks/use-get-user-variables'
import { errorHandler } from '@/shared/utils'

export function getAllSubscriptionPayments(getUserVariables: GetUserVariablesType) {
  const { data: allSubscriptionPaymentsData } = useQuery(GET_ALL_SUBSCRIPTION_PAYMENTS, {
    variables: getUserVariables,
    context: {
      headers: {
        Authorization: `Basic ${getAdminBasicCredentials()}`,
      },
    },
  })

  return allSubscriptionPaymentsData
}
