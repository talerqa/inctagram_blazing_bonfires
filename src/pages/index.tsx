import React from 'react'

import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Toaster } from 'react-hot-toast'

import s from './index.module.scss'

import { PublicPost } from '@/entities/public-post'
import { postsApi } from '@/shared/api'
import { GetAllPublicPostsResponseType } from '@/shared/api/services/posts/posts.api.types'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'
import { wrapper } from '@/shared/providers/store-provider/model/store'
import { ServerSidePropsType } from '@/shared/types/common-types'
import { ContentWrapper } from '@/shared/ui'
import { RegisteredUsersTablo } from '@/shared/ui/registered-users-tablo/ui/registered-users-tablo'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    //fetch publicPosts

    if (context.locale === undefined) throw new Error()

    store.dispatch(postsApi.endpoints?.getAllPublicPosts.initiate({ pageSize: '4' }))

    const data: Array<ServerSidePropsType<GetAllPublicPostsResponseType>> = await Promise.all(
      store.dispatch(postsApi.util?.getRunningQueriesThunk())
    )
      .then(res => {
        return res
      })
      .catch(error => {
        return error
      })

    if (!data[0].data) {
      return {
        redirect: {
          destination: '/404' /*  todo Редирект на 404  */,
          permanent: false,
        },
      }
    }

    return {
      props: {
        ...(await serverSideTranslations(context.locale as string, 'common')),
        publicPostsData: data,
      },
    }
  }
)
type HomeProps = {
  publicPostsData: Array<ServerSidePropsType<GetAllPublicPostsResponseType>>
}

function Home(props: HomeProps) {
  const publicPosts = props.publicPostsData[0].data

  return (
    <div className={s.home}>
      <Toaster position={'bottom-center'} />
      <ContentWrapper className={s.homeContentWrapper}>
        <RegisteredUsersTablo registeredUsers={publicPosts.totalUsers} />
        <div className={s.postsContainer}>
          {publicPosts.items.map(post => (
            <PublicPost key={post.id} {...post} />
          ))}
        </div>
      </ContentWrapper>
    </div>
  )
}

Home.getLayout = getLayout
export default Home
