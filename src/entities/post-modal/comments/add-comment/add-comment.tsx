import React, { useEffect, useRef, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'

import styles from '@/entities/post-modal/comments/add-comment/add-comment.module.scss'
import { PostResponseType } from '@/shared/api'
import { useCreatePostCommentMutation } from '@/shared/api/services/posts/posts.api'
import { Button, Input, InputType } from '@/shared/ui'

export const AddComment = ({ id }: PostResponseType) => {
  const schema = yup.object().shape({
    content: yup.string().required('Error.RequiredField'),
  })
  const { register, reset, handleSubmit } = useForm<{ content: string }>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      content: '',
    },
  })
  const [createPostComment] = useCreatePostCommentMutation()
  const { t } = useTranslation('common', { keyPrefix: 'Post' })
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
    <div className={styles.addCommentContainer}>
      <form className={styles.addCommentForm} onSubmit={handleSubmit(onSubmit)}>
        <Input
          as={'textarea'}
          className={styles.addCommentInput}
          placeholder={t('AddComment')}
          type={InputType.FRAMELESS}
          {...rest}
          ref={e => {
            ref(e)
            textareaRef.current = e
          }}
          onChange={e => setCurrentValue(e.target.value)}
        />
        <Button className={styles.addCommentButton} disabled={!currentValue}>
          {t('Publish')}
        </Button>
      </form>
    </div>
  )
}
