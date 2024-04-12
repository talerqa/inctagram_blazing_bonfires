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
