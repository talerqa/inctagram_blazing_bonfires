import React from 'react'

import { useQuery } from '@apollo/client'

import { GET_USER } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'

export const getSelectedUserProfileData = (selectedUserId: number) => {
  const { data: profileData } = useQuery(GET_USER, {
    variables: {
      userId: selectedUserId,
    },
    context: {
      headers: {
        Authorization: `Basic ${getAdminBasicCredentials()}`,
      },
    },
  })

  return profileData?.getUser
}
