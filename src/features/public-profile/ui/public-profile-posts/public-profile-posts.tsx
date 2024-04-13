import React, { useLayoutEffect, useState } from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'

import style from './public-profile-posts.module.scss'

import { PostModal } from '@/entities/post-modal/post-modal'
import { PostResponseType } from '@/shared/api'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { RoutersPath } from '@/shared/constants/paths'

type Props = PostResponseType & { clickedPostId?: number | undefined }
export const PublicProfilePosts = (post: Props) => {
  const [isPostActive, setIsPostActive] = useState(false)
  const router = useRouter()
  const togglePostModal = () => setIsPostActive(prevState => !prevState)
  const notImageClass = clsx(style.postImage, !post.images[0]?.url && style.postNotImage)

  const openModal = () => {
    router.push(`${RoutersPath.profile}/${post.ownerId}/?data=${post.id}`)
    setIsPostActive(!isPostActive)
  }

  useLayoutEffect(() => {
    post.clickedPostId === post.id && setIsPostActive(true)
  }, [])

  return (
    <div className={style.post}>
      <Image
        className={notImageClass}
        src={post.images[0]?.url ?? noImage}
        width={234}
        height={228}
        alt="Picture of the post"
        onClick={openModal}
      />
      {isPostActive && <PostModal postData={post} togglePostModal={togglePostModal} />}
    </div>
  )
}
