export type PostsResponseType = {
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

export type GetPostsResponseType = PostsResponseType & {
  avatarOwner: string
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
