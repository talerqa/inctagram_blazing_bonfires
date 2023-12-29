import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { EditDeletePost } from '@/features/post/ui/editDeletePost/EditDeletePost'
import { EditDescriptionPost } from '@/features/post/ui/editDescriptionModal/EditDescriptionPost'
import { PostImages } from '@/features/post/ui/postImagesModal/PostImages'
import { Comments } from '@/features/post/ui/postModal/Comments'
import styles from '@/features/post/ui/postModal/PostModal.module.scss'
import style from '@/pages/profile/profile.module.scss'
import { PostsResponseType } from '@/shared/api/services/posts/posts.api.types'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import noImage from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import editDeleteButton from '@/shared/assets/icons/editDeletePost/editDeleteButton.svg'
import closeIcon from '@/shared/assets/icons/icons/closeIcon.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { Button, ButtonTheme } from '@/shared/ui/button/Button'

type Props = {
  postData: PostsResponseType | undefined
  profileData: ProfileUserType | undefined
  setIsPostActive: (isPostActive: boolean) => void
}
export const PostModal = ({ postData, setIsPostActive, profileData }: Props) => {
  const [openBtn, setOpenBtn] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const handleButtonClick = () => {
    setOpenBtn(prevState => !prevState)
  }

  return (
    <>
      {isOpenEdit ? (
        <EditDescriptionPost
          profileData={profileData}
          postData={postData}
          setIsOpenEdit={setIsOpenEdit}
          isOpenEdit={isOpenEdit}
        />
      ) : (
        <div className={styles.postContainer}>
          <Link href={RoutersPath.profile}>
            <div className={styles.closeIconContainer}>
              <Image src={closeIcon} alt={''} onClick={() => setIsPostActive(false)} />
            </div>
          </Link>
          <div className={styles.post}>
            <div className={styles.postPhotoContainer}>
              <PostImages postData={postData} />
            </div>
            <div className={styles.descriptionContainer}>
              <div className={styles.headerContainer}>
                <div className={style.avatarContainer}>
                  <Image
                    src={noImage}
                    alt={'avatar'}
                    width={36}
                    height={36}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <p className={styles.userName}>Jack</p>
                <Button
                  theme={ButtonTheme.CLEAR}
                  className={styles.editDeleteButton}
                  onClick={handleButtonClick}
                >
                  <Image src={editDeleteButton} alt={''} />
                </Button>
                {openBtn && (
                  <EditDeletePost
                    postData={postData}
                    setIsPostActive={setIsPostActive}
                    setIsOpenEdit={setIsOpenEdit}
                    setOpenBtn={setOpenBtn}
                    profileData={profileData}
                  />
                )}
              </div>
              <Comments postData={postData} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
