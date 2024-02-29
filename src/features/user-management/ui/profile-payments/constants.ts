import { useTranslation } from 'next-i18next'

export function getPaymentsColumns() {
  const { t } = useTranslation('common', { keyPrefix: 'PaymentsTable' })
  const columns = [
    {
      key: 'dateOfPayment',
      title: t('DateOfPayment'),
    },
    {
      key: 'endDateOfSubscription',
      title: t('EndDateOfSubscription'),
    },
    {
      key: 'amount',
      title: t('Amount'),
    },
    {
      key: 'subscriptionType',
      title: t('SubscriptionType'),
    },
    {
      key: 'paymentType',
      title: t('PaymentType'),
    },
  ]

  return columns
}
