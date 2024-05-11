import { ApolloError, DocumentNode, FetchMoreOptions, useQuery } from '@apollo/client'
import { ApolloQueryResult, OperationVariables } from '@apollo/client/core'

import { Post } from '@/__generated__/graphql'
import { GET_ALL_POSTS } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import { useGetUserVariables } from '@/shared/hooks/use-get-user-variables'

export type PostsListResult = {
  items?: Post[]
  pageSize?: number
  pagesCount?: number
  totalCount?: number
  subscribeToMore?: any
  error: ApolloError | string
  fetchMore?: any
}

type GetPostsListType = {
  endCursorPostId: number
}

export const getPostsList = ({ endCursorPostId }: GetPostsListType): PostsListResult => {
  const { getUserVariables } = useGetUserVariables()
  const {
    data: postsList,
    error,
    subscribeToMore,
    fetchMore,
  } = useQuery(GET_ALL_POSTS, {
    variables: {
      endCursorPostId,
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
    subscribeToMore,
    fetchMore,
  }
}
