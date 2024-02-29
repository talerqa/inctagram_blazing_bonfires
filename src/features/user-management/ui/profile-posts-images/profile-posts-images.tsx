import React from 'react'

import Image from 'next/image'

import { getLoadedPostsImages } from '../../lib/get-loaded-posts-images'

import s from './profile-posts-images.module.scss'

import { ImagePost } from '@/__generated__/graphql'
import { CircularLoader } from '@/shared/ui'

const ProfilePostsImages = ({ userId }: { userId: number }) => {
  const profilePosts = getLoadedPostsImages(userId)

  if (!profilePosts) return <CircularLoader />

  return (
    <div className={s.postsContainer}>
      {profilePosts?.map((postImage: ImagePost) => (
        <div key={postImage.id} className={s.postWrapper}>
          <Image
            key={postImage.id}
            src={postImage.url as string}
            fill={true}
            alt={"User's post image"}
          />
        </div>
      ))}
    </div>
  )
}

export default ProfilePostsImages
