export type ProfileUserType = {
  id?: number
  userName: string
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  city?: string
  dateOfBirth?: Date | string | number
  aboutMe?: string
  avatars: AvatarsType
}

export type AvatarsType = {
  url?: string
  width?: number
  height?: number
  fileSize: number
}[]

export type BaseUserType = {
  userId: number
  userName: string
  email: string
}

export type GetUserFollowersResponseType = {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  prevCursor: number
  nextCursor?: any
  items: any[] // swagger is incomplete currently
}
export type GetUserFollowingsResponseType = {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  prevCursor: number
  nextCursor?: any
  items: FollowingUsers[]
}

export type FollowingUsers = {
  id: number
  userId: number
  userName: string
  createdAt: string
  avatars: AvatarsType[]
  isFollowing: boolean
  isFollowedBy: boolean
}
