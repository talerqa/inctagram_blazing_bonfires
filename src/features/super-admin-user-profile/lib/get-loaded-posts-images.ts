import { useQuery } from '@apollo/client'

import { GET_USER_PROFILE_POSTS_BY_ID } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'

export function getLoadedPostsImages(selectedUserId: number) {
  const { data: profilePosts } = useQuery(GET_USER_PROFILE_POSTS_BY_ID, {
    variables: {
      userId: selectedUserId,
    },
    context: {
      headers: {
        Authorization: `Basic ${getAdminBasicCredentials()}`,
      },
    },
  })

  return profilePosts?.getPostsByUser.items
}
