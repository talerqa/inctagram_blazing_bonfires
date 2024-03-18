import React from 'react'

import { useTranslation } from 'next-i18next'

import s from './error-message-image.module.scss'

type Props = {
  error: string | undefined
}
export const ErrorMessageImage = (props: Props) => {
  const { t } = useTranslation('common', { keyPrefix: 'AddPost' })
  const { error } = props

  return (
    error && (
      <div className={s.errorWrapper}>
        <p>
          <strong>{t('Error')}</strong>
          <span>{error}</span>
        </p>
      </div>
    )
  )
}
