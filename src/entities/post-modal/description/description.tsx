import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from './description.module.scss'

import { PostResponseType } from '@/shared/api'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import { RoutersPath } from '@/shared/constants/paths'
import { findDate } from '@/shared/utils/find-date'

export const Description = ({
  avatarOwner,
  ownerId,
  userName,
  updatedAt,
  description,
}: PostResponseType) => {
  const router = useRouter()
  const postUpdatedAt = findDate.difference(updatedAt)

  return (
    <div className={styles.descriptionContainer}>
      <div
        className={styles.avatarContainer}
        onClick={() => router.push(`${RoutersPath.profile}/${ownerId}`)}
      >
        <Image src={avatarOwner || noImage} alt={'avatar'} objectFit="cover" fill={true} />
      </div>
      <div className={styles.descriptionWrapper}>
        <div className={styles.descriptionTextContainer}>
          <p className={styles.descriptionText}>
            <span
              className={styles.descriptionTextName}
              onClick={() => router.push(`${RoutersPath.profile}/${ownerId}`)}
            >
              <strong>{userName}</strong>
            </span>
            {description}
          </p>
        </div>
        <div className={styles.descriptionInfoContainer}>
          <p className={styles.descriptionTime}>{postUpdatedAt}</p>
        </div>
      </div>
    </div>
  )
}
