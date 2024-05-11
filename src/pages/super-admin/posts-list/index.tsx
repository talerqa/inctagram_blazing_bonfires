import React, { useEffect, useRef, useState } from 'react'

import { useSubscription } from '@apollo/client'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import s from './posts-list.module.scss'

import { GetPostsQuery, Post as PostType } from '@/__generated__/graphql'
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
  const { data, error, loading } = useSubscription(POSTS_SUBSCRIPTION)

  const { items, fetchMore } = getPostsList({ endCursorPostId: 743 }) // 0 returns last posts
  const [posts, setPosts] = useState<PostType[]>([])
  const [offset, setOffset] = useState(10)

  const loadMore = () => {
    const lastPostId = posts[posts.length - 1].id

    fetchMore({ variables: { endCursorPostId: lastPostId } })
      .then(({ data }: { data: GetPostsQuery }) => {
        debugger
        const newPosts = [...posts, ...data.getPosts.items]

        setPosts(newPosts)
        setOffset(prev => prev + 10)
      })
      .catch((error: any) => {
        toast.error('Error fetching more posts:', error)
      })
  }

  useEffect(() => {
    if (items) {
      setPosts(items)
    }
  }, [items])

  useEffect(() => {
    if (!data?.postAdded) return
    setPosts([data.postAdded, ...posts])
  }, [data])

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50

      if (isNearBottom) {
        loadMore()
      }
      console.log('HANDLE SCROLL TRIGGERED')
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, loadMore])

  console.log(data?.postAdded)

  console.log(posts, ' POSTS')

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
