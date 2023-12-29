import { SubscriptionDataType } from '@/shared/api/services/subscriptions/subscriptions.api.types'

export const payments = [
  {
    dateOfPayment: '10.10.2020',
    endDateOfSubscription: '2.10.2020',
    price: 20,
    subscriptionId: '123',
    subscriptionType: 'MONTHLY',
    paymentType: 'STRIPE',
    userId: 270,
  },
  {
    dateOfPayment: '7.10.2020',
    endDateOfSubscription: '9.10.2020',
    price: 70,
    subscriptionId: '123',
    subscriptionType: 'DAY',
    paymentType: 'STRIPE',
    userId: 270,
  },
  {
    dateOfPayment: '1.10.2020',
    endDateOfSubscription: '6.10.2020',
    price: 10,
    subscriptionId: '123',
    subscriptionType: 'WEEKLY',
    paymentType: 'PAYPAL',
    userId: 270,
  },
] as Array<SubscriptionDataType>
