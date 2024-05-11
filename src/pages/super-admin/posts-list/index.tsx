import React, { useEffect, useRef } from 'react'

import { useSubscription } from '@apollo/client'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import s from './posts-list.module.scss'

import { GetPostsQuery } from '@/__generated__/graphql'
import { getPostsList } from '@/features/super-admin-posts-list/lib/get-posts-list'
import { Post } from '@/features/super-admin-posts-list/ui/post/post'
import { setSearchParameter } from '@/features/super-admin-user-management/model/user-management-slice'
import { POSTS_SUBSCRIPTION } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { handleInputChange } from '@/pages/super-admin/lib/utils/utils'
import {
  addLastAddedPostToUsersPosts,
  selectUsersPosts,
  setUsersPosts,
} from '@/pages/super-admin/modal/slices/admin-reducer'
import { getAdminLayout } from '@/shared/layouts/admin-layout/admin-layout'
import { CircularLoader, Input, InputType } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const PostsList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const usersPosts = useSelector(selectUsersPosts)
  const inputValue = useRef<HTMLInputElement | null>(null)
  const handleSearch = handleInputChange(
    (value: string) => dispatch(setSearchParameter(value)),
    500
  )
  const { data, error, loading } = useSubscription(POSTS_SUBSCRIPTION) // data is recently added Post

  const { items, fetchMore } = getPostsList({ endCursorPostId: 0 }) // 0 returns last 10 posts

  const loadMore = () => {
    if (!usersPosts.length) return
    const lastPostId = usersPosts[usersPosts.length - 1].id

    fetchMore({ variables: { endCursorPostId: lastPostId } })
      .then(({ data }: { data: GetPostsQuery }) => {
        dispatch(setUsersPosts(data.getPosts.items))
      })
      .catch((error: Error) => {
        toast.error('Error fetching more posts:', error as any)
      })
  }

  useEffect(() => {
    if (items) {
      dispatch(setUsersPosts(items))
    }
  }, [items])

  useEffect(() => {
    // Update with new post from subscription
    if (!data?.postAdded) return
    dispatch(addLastAddedPostToUsersPosts(data.postAdded))
  }, [data])

  useEffect(() => {
    // If near bottom fetch more posts
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50

      if (isNearBottom) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, loadMore])

  if (error) {
    toast.error('Error fetching posts:', error as any)
  }

  return (
    <div className={s.posts}>
      <Input
        ref={inputValue}
        type={InputType.SEARCH}
        className={s.searchInput}
        placeholder={t('Search')}
        onChange={handleSearch}
      />
      <div className={s.postsContainer}>
        {usersPosts && usersPosts.map(post => <Post key={post.id} {...post} />)}
      </div>
      <div className={s.loadingSpinner}>{loading && <CircularLoader />}</div>
    </div>
  )
}

PostsList.getLayout = getAdminLayout
export default PostsList
