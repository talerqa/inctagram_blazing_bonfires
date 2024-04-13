import { useMutation } from '@apollo/client'
import { useSelector } from 'react-redux'

import { User } from '@/__generated__/graphql'
import { selectSelectedUser } from '@/features/super-admin-user-management/model/user-management-slice'
import {
  DELETE_USER,
  GET_USERS_LIST,
} from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import { useGetUserVariables } from '@/shared/hooks/use-get-user-variables'

export function useDeleteUserMutation() {
  const user = useSelector(selectSelectedUser)
  const { getUserVariables } = useGetUserVariables()
  const [deleteUser] = useMutation(DELETE_USER, {
    update: cache => {
      const data = cache.readQuery({
        query: GET_USERS_LIST,
        variables: getUserVariables,
        optimistic: true,
      })
      const newData = {
        ...data,
        getUsers: {
          ...data?.getUsers,
          users: data?.getUsers?.users.filter(el => el.id !== user?.id),
        },
      }

      cache.writeQuery({
        query: GET_USERS_LIST,
        variables: getUserVariables,
        data: newData,
      })
    },
    optimisticResponse: () => {
      return { userId: user?.id, removeUser: true }
    },
    onQueryUpdated: observableQuery => {
      void observableQuery.refetch()
    },
  })

  return (user: User | null) => {
    void deleteUser({
      variables: {
        userId: user?.id || 0,
      },
      context: {
        headers: {
          Authorization: `Basic ${getAdminBasicCredentials()}`,
        },
      },
    })
  }
}
