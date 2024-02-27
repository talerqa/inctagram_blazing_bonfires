import React from 'react'

import Image from 'next/image'

import s from './ProfilePostsImages.module.scss'

import { ImagePost } from '@/__generated__/graphql'
import { getLoadedPostsImages } from '@/features/user-management/lib/get-loaded-posts-images'

const ProfilePostsImages = ({ userId }: { userId: number }) => {
  const profilePosts = getLoadedPostsImages(userId)

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
