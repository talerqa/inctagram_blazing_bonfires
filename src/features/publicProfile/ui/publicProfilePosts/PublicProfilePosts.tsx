import React, { useState } from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'

import style from './PublicProfilePosts.module.scss'

import { PostModal } from '@/entities/postModal/PostModal'
import { PostResponseType } from '@/shared/api'
import noImage from '@/shared/assets/icons/image/no-image.svg'

export const PublicProfilePosts = (post: PostResponseType) => {
  const [isPostActive, setIsPostActive] = useState(false)
  const togglePostModal = () => setIsPostActive(prevState => !prevState)
  const notImageClass = clsx(style.postImage, !post.images[0]?.url && style.postNotImage)

  return (
    <div className={style.post}>
      <Image
        className={notImageClass}
        src={post.images[0]?.url ?? noImage}
        width={234}
        height={228}
        alt="Picture of the post"
        onClick={() => setIsPostActive(!isPostActive)}
      />
      {isPostActive && <PostModal postData={post} togglePostModal={togglePostModal} />}
    </div>
  )
}
