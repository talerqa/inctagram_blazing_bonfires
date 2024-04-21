import { useTranslation } from 'next-i18next'

import s from './registered-users-tablo.module.scss'

type RegisteredUsersTabloType = {
  registeredUsers: number
}

export const RegisteredUsersTablo = ({ registeredUsers }: RegisteredUsersTabloType) => {
  const digitAtnumberOfUsersAsSeparateDiv = String(registeredUsers)
    .padStart(6, '0')
    .split('')
    .map((number, idx) => <div key={idx}>{number}</div>)
  const { t } = useTranslation('common')

  return (
    <div className={s.registeredUsersTablo}>
      <div className={s.registeredUsersTabloContainer}>
        {t('RegisteredUsers')}
        <div className={s.numbersContainer}>{digitAtnumberOfUsersAsSeparateDiv}</div>
      </div>
    </div>
  )
}
