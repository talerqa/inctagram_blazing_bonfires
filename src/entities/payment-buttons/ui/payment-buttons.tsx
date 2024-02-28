import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import styles from './payment-buttons.module.scss'

import payPal from '@/shared/assets/icons/payments/pay-pal.svg'
import stripe from '@/shared/assets/icons/payments/stripe.svg'

type PropsType = {
  paypalHandler: () => void
  stripeHandler: () => void
}

export const PaymentButtons = (props: PropsType) => {
  const { paypalHandler, stripeHandler } = props

  const { t } = useTranslation('common', { keyPrefix: 'AccountManagement' })

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footer}>
        <button className={styles.imgWrapper} onClick={paypalHandler}>
          <Image className={styles.img} src={payPal} alt="payPal icon" />
        </button>
        <p>{t('or')}</p>
        <button className={styles.imgWrapper} onClick={stripeHandler}>
          <Image className={styles.img} src={stripe} alt="stripe icon" />
        </button>
      </div>
    </div>
  )
}
