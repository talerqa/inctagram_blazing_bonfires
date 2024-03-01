import React, { useRef } from 'react'

import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'

import s from './payments-list.module.scss'

import { AllSubscriptionPaymentsTableWithPagination } from '@/features/all-subscription-payments-table-with-pagination'
import { setSearchParameter } from '@/features/super-admin-user-management/model/user-management-slice'
import { handleInputChange } from '@/pages/super-admin/lib/utils/utils'
import { getAdminLayout } from '@/shared/layouts/admin-layout/admin-layout'
import { Checkbox, Input, InputType } from '@/shared/ui'

const PaymentsList = () => {
  const inputValue = useRef<HTMLInputElement | null>(null)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const handleSearch = handleInputChange(
    (value: string) => dispatch(setSearchParameter(value)),
    500
  )

  return (
    <div className={s.paymentsPage}>
      <div className={s.checkbox}>
        <Checkbox fullWidth={false}>Auto update</Checkbox>
      </div>

      <Input
        ref={inputValue}
        type={InputType.SEARCH}
        className={s.search}
        placeholder={t('Search')}
        onChange={handleSearch}
      />
      <AllSubscriptionPaymentsTableWithPagination />
    </div>
  )
}

PaymentsList.getLayout = getAdminLayout
export default PaymentsList
