import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'

import { Payments } from './payments'

import { useGetSubscriptionsQuery } from '@/shared/api/services/subscriptions/subscriptions.api'
import { SubscriptionDataType } from '@/shared/api/services/subscriptions/subscriptions.api.types'

jest.mock('@/shared/api/services/subscriptions/subscriptions.api', () => ({
  ...jest.requireActual('@/shared/api/services/subscriptions/subscriptions.api'),
  useGetSubscriptionsQuery: jest.fn(),
}))

describe('Payments', () => {
  it('renders the component with data', async () => {
    ;(useGetSubscriptionsQuery as jest.Mock).mockReturnValue({
      data: payments,
      isLoading: false,
      isError: false,
    })

    render(<Payments />)

    await waitFor(() => {
      expect(screen.getByTestId('table')).toBeInTheDocument()
    })
  })
})

const payments = [
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
