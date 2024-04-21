import { useTranslation } from 'next-i18next'

enum NOTIFICATION_MESSAGE_SLICES {
  SUBSCRIPTION_WILL_BE_DEBITED_AFTER = 'The next subscription payment will be debited from your account after',
  SUBSCRIPTION_ENDS = 'Your subscription ends in',
  SUBSCRIPTION_ACTIVATED_UNTIL = 'Your subscription has been activated and is valid until',
}

export const useTranslateNotificationMessage = () => {
  const { t } = useTranslation('common')

  return {
    translateNotificationMessage: (message: string) => {
      const splittedMessage = message.split(' ')
      const notificationDaysNumber = splittedMessage[splittedMessage.length - 2]
      const notificationDayWord = splittedMessage[splittedMessage.length - 1].replace('.', '')

      if (message.includes(NOTIFICATION_MESSAGE_SLICES.SUBSCRIPTION_WILL_BE_DEBITED_AFTER)) {
        return (
          t('Notifications.paymentWillBeDebited') +
          ' ' +
          notificationDaysNumber +
          ' ' +
          t(`Notifications.${notificationDayWord}`)
        )
      } else if (message.includes(NOTIFICATION_MESSAGE_SLICES.SUBSCRIPTION_ENDS)) {
        return (
          t('Notifications.subscriptionEnds') +
          ' ' +
          notificationDaysNumber +
          ' ' +
          t(`Notifications.${notificationDayWord}`)
        )
      } else if (message.includes(NOTIFICATION_MESSAGE_SLICES.SUBSCRIPTION_ACTIVATED_UNTIL)) {
        return t('Notifications.subscriptionIsActivatedUntil') + ' ' + notificationDayWord
      }

      return 'No message to translate'
    },
  }
}
