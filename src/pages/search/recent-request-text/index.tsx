import React from 'react'

import { useTranslation } from 'next-i18next'

import { Text } from '@/shared/ui'

const RecentRequestText = () => {
  const { t } = useTranslation('common', { keyPrefix: 'SearchPage' })

  return (
    <Text as={'p'} size={'medium'} weight={'semi_bold'} style={{ marginTop: '30px' }}>
      {t('RecentRequests')}
    </Text>
  )
}

export default RecentRequestText
