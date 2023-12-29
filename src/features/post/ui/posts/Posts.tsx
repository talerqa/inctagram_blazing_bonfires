import React, { FC, useState } from 'react'

import style from './Posts.module.scss'

import { PostModal } from '@/features/post/ui/postModal/PostModal'
import { useLazyGetPostQuery } from '@/shared/api/services/posts/posts.api'
import { GetPostsResponseType } from '@/shared/api/services/posts/posts.api.types'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'

type PostsProps = {
  posts: GetPostsResponseType[]
  profileData: ProfileUserType | undefined
}
export const Posts: FC<PostsProps> = ({ posts, profileData }) => {
  const [getPost, { data: postData }] = useLazyGetPostQuery()
  const [isPostActive, setIsPostActive] = useState(false)

  return (
    <div className={style.photoWrapper}>
      {posts.map(p => {
        return (
          <img
            key={p.id}
            src={p?.images[0]?.url}
            alt={'photo'}
            className={style.photo}
            onClick={() =>
              getPost(p.id)
                .unwrap()
                .then(() => setIsPostActive(true))
            }
          />
        )
      })}
      {isPostActive && (
        <PostModal
          postData={postData}
          setIsPostActive={setIsPostActive}
          profileData={profileData}
        />
      )}
    </div>
  )
}
