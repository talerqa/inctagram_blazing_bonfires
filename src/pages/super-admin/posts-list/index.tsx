import React from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import s from './posts-list.module.scss'

import { PostImages } from '@/features/post/ui'
import { getPostsList } from '@/features/super-admin-posts-list/lib/get-posts-list'
import Post from '@/features/super-admin-posts-list/ui/post'
import { PostResponseType } from '@/shared/api'
import { useTruncateText } from '@/shared/hooks'
import { getAdminLayout } from '@/shared/layouts/admin-layout/admin-layout'
import { ContentWrapper, LinearLoader } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const PostsList = () => {
  const { items: posts } = getPostsList()

  if (!posts) return <LinearLoader />

  return (
    <div className={s.posts}>
      Posts List
      <ContentWrapper className={s.contentWrapper}>
        <div className={s.postsContainer}>
          {posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </ContentWrapper>
    </div>
  )
}

PostsList.getLayout = getAdminLayout
export default PostsList
