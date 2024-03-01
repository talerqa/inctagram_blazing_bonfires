import { useTranslation } from 'next-i18next'

export function getAllSubscriptionPaymentsColumnHeaders() {
  const { t } = useTranslation('common')
  const columns = [
    {
      key: 'username',
      title: t('PaymentsTable.Username'),
      sortable: true,
    },
    {
      key: 'dateAdded',
      title: t('PaymentsTable.DateAdded'),
      sortable: true,
    },
    {
      key: 'amount',
      title: t('PaymentsTable.Amount'),
      sortable: true,
    },
    {
      key: 'subscription',
      title: t('PaymentsTable.Subscription'),
      sortable: false,
    },
    {
      key: 'paymentType',
      title: t('PaymentsTable.PaymentType'),
      sortable: true,
    },
  ]

  return columns
}
