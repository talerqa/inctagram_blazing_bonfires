import React from 'react'

import { useTranslation } from 'next-i18next'

import style from '@/pages/search/search.module.scss'
import { Text } from '@/shared/ui'

const AuxiliaryText = () => {
  const { t } = useTranslation('common', { keyPrefix: 'SearchPage' })

  return (
    <>
      <Text as={'p'} size={'medium'} className={style.auxiliaryInfo} weight={'bold'}>
        {t('EmptyPlace')}
      </Text>
      <Text as={'p'} size={'small'} className={style.auxiliaryInfoNext}>
        {t('NoRecentRequests')}
      </Text>
    </>
  )
}

export default AuxiliaryText
