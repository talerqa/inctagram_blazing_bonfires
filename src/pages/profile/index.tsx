import React, { useEffect, useState } from 'react'

import { GetStaticProps } from 'next'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import style from './profile.module.scss'

import { PostModal } from '@/entities/post-modal/post-modal'
import { ProfileData } from '@/features/profile-data/profile-data'
import { PostResponseType } from '@/shared/api'
import {
  useLazyGetPublicPostQuery,
  useLazyGetPublicUserPostsQuery,
} from '@/shared/api/services/posts/posts.api'
import { useLazyGetProfileUserQuery } from '@/shared/api/services/profile/profile.api'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const postsAmount = 9

function Profile() {
  const [getProfile, { data: profileData }] = useLazyGetProfileUserQuery()
  const [getUserPosts, { data: userPost }] = useLazyGetPublicUserPostsQuery()
  const [getPost, { data: postData = {} as PostResponseType }] = useLazyGetPublicPostQuery()
  const [isPostActive, setIsPostActive] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(postsAmount)
  const [pageCount, setPageCount] = useState(1)
  const [userId, setUserId] = useState<number | null>(null)
  const [totalCount, setTotalCount] = useState(postsAmount)
  const [endCursorPostId, setEndCursorPostId] = useState(0)
  const [isFetching, setIsFetching] = useState(true)

  const posts = userPost?.items || []

  useEffect(() => {
    getProfile()
      .unwrap()
      .then(res => {
        if (res.id) {
          setUserId(res.id)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (userId && isFetching && posts.length < totalCount) {
      getUserPosts({ userId, pageNumber, pageSize, endCursorPostId })
        .unwrap()
        .then(res => {
          setPageCount(res.pagesCount)
          setPageSize(prev => prev + postsAmount)
          setIsFetching(false)
          setTotalCount(res.totalCount)
        })
    }
  }, [isFetching, userId])

  const scrollHandler = () => {
    const { scrollHeight } = document.documentElement
    const { scrollTop } = document.documentElement
    const { innerHeight } = window

    if (scrollHeight - (scrollTop + innerHeight) < 100 && posts.length < totalCount) {
      setIsFetching(true)
    }
  }

  const togglePostModal = () => setIsPostActive(prevState => !prevState)

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return () => document.removeEventListener('scroll', scrollHandler)
  }, [totalCount])

  return (
    <div className={style.profileContainer}>
      <ProfileData profileData={profileData} />
      <div className={style.photosContainer}>
        <div className={style.photoWrapper}>
          {posts.map(p => {
            return (
              <Image
                key={p.id}
                src={p?.images[0]?.url}
                alt={'post image'}
                className={style.photo}
                onClick={() => getPost(p.id).unwrap().then(togglePostModal)}
                width={234}
                height={228}
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
      </div>
    </div>
  )
}

Profile.getLayout = getLayout
export default Profile
