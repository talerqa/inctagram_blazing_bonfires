import React from 'react'

import { useTranslation } from 'next-i18next'

import s from './errorMessageImage.module.scss'

type Props = {
  error: string | undefined
}
const ErrorMessageImage = (props: Props) => {
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

export default ErrorMessageImage
