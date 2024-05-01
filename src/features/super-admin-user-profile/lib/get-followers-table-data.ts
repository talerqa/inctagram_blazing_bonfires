import { useState } from 'react'

import { useQuery } from '@apollo/client'
import { useTranslation } from 'next-i18next'

import {
  GET_FOLLOWERS_USERS,
  GET_FOLLOWING_USERS,
  GET_USER_PAYMENTS,
} from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import { useGetProfileUserQuery } from '@/shared/api'
import { useGetProfileFollowersQuery } from '@/shared/api/services/profile/profile.api'
import { useGetPublicProfileQuery } from '@/shared/api/services/public/public.api'
import { PublicProfileType } from '@/shared/api/services/public/public.api.types'
import { GetUserVariablesType } from '@/shared/hooks/use-get-user-variables'
import { errorHandler } from '@/shared/utils'

// export async function getUserFollowersData(userId: number) {
//   let followers
//
//   try {
//     const { data: profileData } = await useGetPublicProfileQuery(userId)
//
//     if (profileData) {
//       followers = await activateProfileFollowers(profileData.userName)
//     }
//   } catch {
//     console.log('error')
//   }
//
//   return followers
// }
//
// async function activateProfileFollowers(userName: string) {
//   const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
//   const { data: followers, error } = useGetProfileFollowersQuery({ userName })
//   // const { data: followers } = useGetProfileFollowersQuery({ userName: 'DenInc122335544' })
//
//   if (!followers) return []
//   if (error) {
//     errorHandler(error, tError('NotAuthorization'), tError('TryAgain'), tError('NetworkError'))
//   }
//
//   //TODO
//   return followers
// }

export function getFollowersUsersData(
  { statusFilter, searchTerm, ...sortAndPaginationData }: GetUserVariablesType,
  selectedUserId: number
) {
  const { data: userFollowers } = useQuery(GET_FOLLOWERS_USERS, {
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

  return userFollowers
}
