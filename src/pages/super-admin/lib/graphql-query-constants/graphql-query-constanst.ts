import { gql } from '@/__generated__'

export const ADMIN_LOGIN = gql(`
  mutation LoginAdmin($email: String!, $password: String!) {
  loginAdmin(email: $email, password: $password) {
    logged
  }
}
`)

// GetUsers fragments
export const AVATARS_FRAGMENT = gql(`
  fragment AvatarsFragment on Avatar {
    url
    width
    height
    fileSize
  }
`)

export const PROFILE_FRAGMENT = gql(`
  fragment ProfileFragment on Profile {
    id
    userName
    firstName
    lastName
    city
    dateOfBirth
    aboutMe
    createdAt
    avatars {
      ...AvatarsFragment
    }
  }
  ${AVATARS_FRAGMENT}
`)

export const USER_FRAGMENT = gql(`
  fragment UserFragment on User {
    id
    userName
    email
    createdAt
    profile {
      ...ProfileFragment
    }
    userBan {
       reason
       createdAt
    }
  }
  ${PROFILE_FRAGMENT}
`)

// Query with fragments
export const GET_USERS_LIST = gql(`
  query GetUsers($pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $searchTerm: String, $statusFilter: UserBlockStatus) {
  getUsers(pageSize: $pageSize, pageNumber: $pageNumber, sortBy:$sortBy, sortDirection: $sortDirection, searchTerm: $searchTerm, statusFilter: $statusFilter) {
    users {
      id,
      userName,
      email,
      createdAt,
      profile {
        id, 
        userName,
        firstName,
        lastName,
        city,
        dateOfBirth,
        aboutMe, 
        createdAt, 
        avatars {
        	url, width, height, fileSize 
        }
      },
      userBan {
        reason, createdAt
      } 
    },
    pagination {pagesCount, page, pageSize, totalCount}
  }
}
`)

export const BAN_USER = gql(`
  mutation BanUser($banReason: String!, $userId: Int!) {
  banUser(banReason: $banReason, userId: $userId)
}
  `)

export const UNBAN_USER = gql(`
  mutation UnbanUser($userId: Int!) {
    unbanUser(userId: $userId)
}
  `)

export const DELETE_USER = gql(`
  mutation DeleteUser($userId: Int!) {
    removeUser(userId: $userId)
}
  `)
