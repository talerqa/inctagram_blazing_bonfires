import React from 'react'

import { Input, InputType } from '@/shared/ui'

const IndexSearchList = () => {
  return (
    <div>
      <Input type={InputType.SEARCH} placeholder={{t('Search')}} />
    </div>
  )
}

export default IndexSearchList
