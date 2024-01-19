import React from 'react'

import { Toaster } from 'react-hot-toast'

import s from './Home.module.scss'

import { PublicPost } from '@/entities/publicPost'
import { useGetAllPublicPostsQuery } from '@/shared/api/services/posts/posts.api'
import { ContentWrapper, LinearLoader } from '@/shared/ui'
import { RegisteredUsersTablo } from '@/shared/ui/registeredUsersTablo/ui/RegisteredUsersTablo'

function Home() {
  const { data: publicPosts } = useGetAllPublicPostsQuery({
    pageSize: '4',
  })

  if (!publicPosts) return <LinearLoader />

  return (
    <div className={s.home}>
      {/*<Toaster position={'bottom-center'} />*/}
      {/*<ContentWrapper className={s.homeContentWrapper}>*/}
      {/*  <RegisteredUsersTablo registeredUsers={publicPosts.totalUsers} />*/}
      {/*  <div className={s.postsContainer}>*/}
      {/*    {publicPosts.items.map(post => (*/}
      {/*      <PublicPost key={post.id} {...post} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</ContentWrapper>*/}
    </div>
  )
}

export default Home
