import React, { FC, useState } from 'react'

import style from './Posts.module.scss'

import { PostModal } from '@/entities/postModal/PostModal'
import { useLazyGetPublicPostQuery } from '@/shared/api/services/posts/posts.api'
import { GetPostsResponseType, PostResponseType } from '@/shared/api/services/posts/posts.api.types'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'

type PostsProps = {
  posts: GetPostsResponseType[]
  profileData: ProfileUserType | undefined
}
export const Posts: FC<PostsProps> = ({ posts, profileData }) => {
  const [getPost, { data: postData = {} as PostResponseType }] = useLazyGetPublicPostQuery()
  const [isPostActive, setIsPostActive] = useState(false)

  const togglePostModal = () => setIsPostActive(prevState => !prevState)

  return (
    <div className={style.photoWrapper}>
      {posts.map(p => {
        return (
          <img
            key={p.id}
            src={p?.images[0]?.url}
            alt={'photo'}
            className={style.photo}
            onClick={() => getPost(p.id).unwrap().then(togglePostModal)}
          />
        )
      })}
      {isPostActive && (
        <PostModal
          postData={postData}
          togglePostModal={togglePostModal}
          profileData={profileData}
        />
      )}
    </div>
  )
}
