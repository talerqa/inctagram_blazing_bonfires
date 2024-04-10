export type usersResponseType = {
  items: userType[]
  nextCursor: null | number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type userType = {
  avatars: []
  createdAt: string
  firstName: string | null
  id: number
  lastName: string | null
  userName: string
}
