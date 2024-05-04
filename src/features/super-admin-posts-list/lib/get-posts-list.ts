import { ApolloError, useQuery } from '@apollo/client'

import { Post } from '@/__generated__/graphql'
import { GET_ALL_POSTS } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import { useGetUserVariables } from '@/shared/hooks/use-get-user-variables'

export type PostsListResult = {
  items?: Post[]
  pageSize?: number
  pagesCount?: number
  totalCount?: number
  error: ApolloError | string
}

export const getPostsList = (): PostsListResult => {
  const { getUserVariables, sort, setSort } = useGetUserVariables()
  const { data: postsList, error } = useQuery(GET_ALL_POSTS, {
    variables: {
      endCursorPostId: 0,
      ...getUserVariables,
    },
    context: {
      headers: {
        Authorization: `Basic ${getAdminBasicCredentials()}`,
      },
    },
  })

  if (error) return { error: error }

  return {
    ...postsList?.getPosts,
    error: '',
  }
}
