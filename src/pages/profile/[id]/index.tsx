import React from 'react'

import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Toaster } from 'react-hot-toast'

import style from './ProfileId.module.scss'

import { PublicProfileData, PublicProfilePosts } from '@/features/publicProfile'
import { publicApi } from '@/shared/api'
import {
  PublicProfilePostsResponseType,
  PublicProfileType,
} from '@/shared/api/services/public/public.api.types'
import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'
import { wrapper } from '@/shared/providers/storeProvider/model/store'
import { ServerSidePropsType } from '@/shared/types/commonTypes'
import { ContentWrapper } from '@/shared/ui'

type PropsType = {
  profileData: PublicProfileType
  postData: PublicProfilePostsResponseType
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    const { id } = context.query
    const locale = context.locale

    if (locale === undefined) throw new Error()

    // get data about user
    store.dispatch(
      publicApi.endpoints?.getPublicProfile.initiate(Number(id), { forceRefetch: true })
    )

    const data: Array<ServerSidePropsType<PublicProfileType>> = await Promise.all(
      store.dispatch(publicApi.util?.getRunningQueriesThunk())
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

    // get data about user's posts
    store.dispatch(
      publicApi.endpoints?.getPublicProfilePosts.initiate(
        { userId: Number(id) },
        { forceRefetch: true }
      )
    )
    const post: Array<ServerSidePropsType<PublicProfilePostsResponseType>> = await Promise.all(
      store.dispatch(publicApi.util?.getRunningQueriesThunk())
    )
      .then(res => {
        return res
      })
      .catch(error => {
        return error
      })

    return {
      props: {
        profileData: data[0].data,
        postData: post[0].data,
        // ...(await serverSideTranslations(locale as string, 'common')),
      },
    }
  }
)

function PublicProfilePage(props: PropsType) {
  const { profileData, postData } = props

  const amountPost = postData.items?.length
  const isAuth = false /* todo не залогинен */

  return (
    <div className={style.publicProfileWrapper}>
      <Toaster position={'bottom-center'} />
      <ContentWrapper className={style.contentWrapper}>
        {!isAuth && (
          <div className={style.publicProfileContainer}>
            <div className={style.profileContainer}>
              <PublicProfileData data={profileData} amountPost={amountPost} />
            </div>
            <div className={style.postsContainer}>
              {postData &&
                postData.items.map(post => <PublicProfilePosts key={post.id} {...post} />)}
            </div>
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

PublicProfilePage.getLayout = getLayout
export default PublicProfilePage
