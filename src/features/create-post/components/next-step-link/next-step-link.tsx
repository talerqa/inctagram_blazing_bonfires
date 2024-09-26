import React, { MouseEventHandler } from 'react'

import { useTranslation } from 'next-i18next'

import style from '@/features/create-post/components/next-step-link/next-step-link.module.scss'
type Props = {
  onClick: MouseEventHandler
  title: string
}
export const NextStepLink = ({ onClick, title }: Props) => {
  const { t } = useTranslation('common', { keyPrefix: 'AddPost' })

  return (
    <h3 className={style.publishBtn} onClick={onClick}>
      {t(title)}
    </h3>
  )
}
