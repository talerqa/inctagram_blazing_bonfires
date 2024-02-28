import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  PaymentType,
  SubscriptionType,
} from '@/shared/api/services/subscriptions/subscriptions.api.types'

export const paymentSchema = (basePath: string) =>
  yup.object().shape({
    typeSubscription: yup.string<SubscriptionType>().required(),
    paymentType: yup.string<PaymentType>().required(),
    amount: yup.number().default(1).required(),
    baseUrl: yup.string().default(basePath).required(),
  })
