import { useTranslation } from 'next-i18next'

export function getUserFollowersColumns() {
  const { t } = useTranslation('common', { keyPrefix: 'FollowersTable' })
  const columns = [
    {
      key: 'id',
      title: t('UserID'),
    },
    {
      key: 'userName',
      title: t('UserName'),
    },
    {
      key: 'profileLink',
      title: t('ProfileLink'),
    },
    {
      key: 'subscriptionDate',
      title: t('SubscriptionDate'),
    },
  ]

  return columns
}
