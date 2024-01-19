export type PostResponseType = {
  avatarOwner: string
  id: number
  description: string
  location: string
  images: ImageDataType[]
  createdAt: string
  updatedAt: string
  ownerId: number
  owner: {
    firstName: string
    lastName: string
  }
}
export type PostsType = {
  description: string
  childrenMetadata: {
    uploadId: string
  }[]
}
export type ImageDataType = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}

export type ImagesResponse = {
  images: ImageDataType[]
}

export type GetPostsResponseType = PostResponseType & {
  avatarOwner: string
}

export type GetAllPublicPostsResponseType = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: PostResponseType[]
}

export type GetAllPostsArgs = {
  endCursorPostId?: string // ID of the last uploaded publicPost. If endCursorPostId not provided, the first set of posts is returned.
  pageSize?: string
  sortBy?: string // 'id', 'description', 'location', 'createdAt
  sortDirection?: 'desc' | 'asc' // default desc
}
export type GetUserPostsResponseType = {
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
  items: GetPostsResponseType[]
}

export type GetUserPostsRequestType = {
  userId: number
  pageSize: number
  pageNumber: number
  endCursorPostId: number
}

export type CreatePostRequest = {
  description: string
}
export type UpdatePostRequestType = {
  postId: number
  body: CreatePostRequest
}
