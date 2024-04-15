export type UsersResponseType = {
  items: UserType[]
  nextCursor: null | number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type UserType = {
  avatars: AvatarType[]
  createdAt: string
  firstName: string | null
  id: number
  lastName: string | null
  userName: string
}

export type AvatarType = {
  url?: string
  width?: string
  height?: string
  fileSize?: string
}

export type ExtendedUserType = {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  dateOfBirth: string
  aboutMe: string
  avatars: AvatarType
  isFollowing: boolean
  isFollowedBy: boolean
  followingCount: number
  followersCount: number
  publicationsCount: number
}
