import React from 'react'

import { Post } from '@/__generated__/graphql'
import { PostImages } from '@/features/post/ui'
import s from '@/pages/super-admin/posts-list/posts-list.module.scss'
import { useTruncateText } from '@/shared/hooks'

const Post = (post: Post) => {
  const { displayShowMore, isShowMoreActive, setIsShowMoreActive, fullText } = useTruncateText(
    post.description,
    80
  )

  return (
    <div className={s.postContainer}>
      <div className={s.post}>
        <div className={s.postPhotoContainer}>
          <PostImages
            postData={post}
            // wrapperStyle={{ width: 234, height: 240 }}
            wrapperStyle={{ width: '100%', height: '100%' }}
            imgStyle={{
              maxWidth: '100%',
              maxHeight: '100%',
              position: 'absolute',
            }}
          />
        </div>
        <p className={s.postDescription}>
          {fullText}
          {displayShowMore && (
            <span onClick={() => setIsShowMoreActive(!isShowMoreActive)} className={s.showMore}>
              {isShowMoreActive ? 'Hide' : 'Show more'}
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

export default Post
