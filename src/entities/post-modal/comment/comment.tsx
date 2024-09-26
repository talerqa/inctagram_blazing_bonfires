import React, { useEffect, useRef, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import * as yup from 'yup'

import styles from './comment.module.scss'

import { selectIsLoggedIn } from '@/shared/api'
import { useCreatePostCommentMutation } from '@/shared/api/services/posts/posts.api'
import { PostResponseType } from '@/shared/api/services/posts/posts.api.types'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import likeIcon from '@/shared/assets/icons/icons/like-icon.svg'
import saveIcon from '@/shared/assets/icons/icons/save-icon.svg'
import shareIcon from '@/shared/assets/icons/icons/share-icon.svg'
import { Input, InputType } from '@/shared/ui'
import { findDate } from '@/shared/utils/find-date'

export const Comment = ({ avatarOwner, createdAt, id }: PostResponseType) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const postCreatedAt = findDate.format(createdAt)

  const postLikes = 2435
  const schema = yup.object().shape({
    content: yup.string().required('Error.RequiredField'),
  })
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{ content: string }>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      content: '',
    },
  })

  const [createPostComment] = useCreatePostCommentMutation()
  const onSubmit = ({ content }: { content: string }) => {
    createPostComment({ postId: id, content })
      .unwrap()
      .then(() => {
        reset()
        setCurrentValue('')
      })
      .catch(error => {
        const errMessage = error.data.messages[0].message

        toast.error(errMessage)
      })
  }

  const textareaRef: React.MutableRefObject<HTMLTextAreaElement | null> = useRef(null)
  const [currentValue, setCurrentValue] = useState('')
  const { ref, ...rest } = register('content')

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight

      scrollHeight < 72
        ? (textareaRef.current.style.height = scrollHeight + 'px')
        : (textareaRef.current.style.height = '72px')
    }
  }, [currentValue])

  return (
    <div className={styles.commentContainerWrapper}>
      <div className={styles.summaryContainer}>
        {isLoggedIn && (
          <div className={styles.actionsContainer}>
            <div className={styles.likeShareContainer}>
              <Image src={likeIcon} width={24} height={24} style={{ cursor: 'pointer' }} alt={''} />
              <Image
                src={shareIcon}
                width={24}
                height={24}
                style={{ cursor: 'pointer' }}
                alt={''}
              />
            </div>
            <div>
              <Image src={saveIcon} width={24} height={24} style={{ cursor: 'pointer' }} alt={''} />
            </div>
          </div>
        )}
        <div className={styles.totalLikes}>
          <div className={styles.avatarContainer}>
            <Image
              className={styles.totalLikesAvatar}
              src={avatarOwner || noImage}
              alt={'avatar'}
              width={24}
              height={24}
            />
          </div>
          <p className={styles.totalLikesCount}>
            {postLikes.toLocaleString()} {t('Likes')}
          </p>
        </div>
        <div className={styles.postDate}>{postCreatedAt}</div>
      </div>
      {isLoggedIn && (
        <div className={styles.addCommentContainer}>
          <form className={styles.addCommentForm} onSubmit={handleSubmit(onSubmit)}>
            <Input
              as={'textarea'}
              placeholder={t('AddComment')}
              type={InputType.FRAMELESS}
              {...rest}
              ref={e => {
                ref(e)
                textareaRef.current = e
              }}
              onChange={e => setCurrentValue(e.target.value)}
            />
            <button className={styles.addCommentButton}>{t('Publish')}</button>
          </form>
        </div>
      )}
    </div>
  )
}
