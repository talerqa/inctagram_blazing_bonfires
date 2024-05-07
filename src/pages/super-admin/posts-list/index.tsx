import React, { useEffect, useRef, useState } from 'react'

import { useSubscription } from '@apollo/client'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDispatch } from 'react-redux'

import s from './posts-list.module.scss'

import { Post as PostType } from '@/__generated__/graphql'
import { getPostsList } from '@/features/super-admin-posts-list/lib/get-posts-list'
import { Post } from '@/features/super-admin-posts-list/ui/post/post'
import { setSearchParameter } from '@/features/super-admin-user-management/model/user-management-slice'
import {
  GET_ALL_POSTS,
  GET_POSTS_BY_USER_ADMIN,
  POSTS_SUBSCRIPTION,
} from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { handleInputChange } from '@/pages/super-admin/lib/utils/utils'
import { getAdminLayout } from '@/shared/layouts/admin-layout/admin-layout'
import { Input, InputType, LinearLoader } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const PostsList = () => {
  const inputValue = useRef<HTMLInputElement | null>(null)
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const handleSearch = handleInputChange(
    (value: string) => dispatch(setSearchParameter(value)),
    500
  )

  const { items, subscribeToMore } = getPostsList({ endCursorPostId: 0 }) // 0 returns last posts
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    if (items) {
      setPosts(items)
    }
  }, [items])

  const { data, loading, error } = useSubscription(POSTS_SUBSCRIPTION)

  console.log(data, 'SUBSCRIPTON')
  console.log(loading, 'LOADING')
  console.log(error, 'ERROR')

  useEffect(() => {
    const subscribeToNewPosts = () => {
      subscribeToMore({
        document: POSTS_SUBSCRIPTION,
        updateQuery: (prev: any, { subscriptionData, error }: any) => {
          if (error) {
            console.error('Subscription error:', error)

            return prev
          }
          // if (!subscriptionData.data) return {
          //   console.error('Subscription error:', error)
          //   prev
          // }
          const newPost = subscriptionData.data.postAdded

          setPosts([...prev, newPost])
          // return {
          //   ...prev,
          //   getPosts: [...prev.getPosts],
          //   items: [...prev.getPosts.items, newPost], // Add the new post to existing posts
          // }
        },
      })
    }

    subscribeToNewPosts()
  }, [])

  return (
    <div className={s.posts}>
      <Input
        ref={inputValue}
        type={InputType.SEARCH}
        className={s.searchInput}
        placeholder={t('Search')}
        onChange={handleSearch}
      />
      Posts List
      <div className={s.postsContainer}>
        {posts && posts.map(post => <Post key={post.id} {...post} />)}
      </div>
    </div>
  )
}

PostsList.getLayout = getAdminLayout
export default PostsList
