export type SubscriptionType = 'DAY' | 'WEEKLY' | 'MONTHLY'

export type PaymentType = 'STRIPE' | 'PAYPAL'

export type NewSubscriptionType = {
  typeSubscription: SubscriptionType
  paymentType: PaymentType
  amount: number
  baseUrl: string
}

export type SubscriptionDataType = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: PaymentType
  price: number
  subscriptionId: string
  subscriptionType: SubscriptionType
  userId: number
}

export type ResponseNewSubscriptionType = {
  url: string
}

export type CurrentSubscriptionType = {
  data: SubscriptionDataType[]
  hasAutoRenewal: boolean
}
