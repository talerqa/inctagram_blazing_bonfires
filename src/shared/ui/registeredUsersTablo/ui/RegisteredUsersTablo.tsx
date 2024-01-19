import s from './RegisteredUsersTablo.module.scss'

type RegisteredUsersTabloType = {
  registeredUsers: number
}

export const RegisteredUsersTablo = ({ registeredUsers }: RegisteredUsersTabloType) => {
  const digitAtnumberOfUsersAsSeparateDiv = String(registeredUsers)
    .padStart(6, '0')
    .split('')
    .map((number, idx) => <div key={idx}>{number}</div>)

  return (
    <div className={s.registeredUsersTablo}>
      <div className={s.registeredUsersTabloContainer}>
        <p>Registered users</p>
        <div className={s.numbersContainer}>{digitAtnumberOfUsersAsSeparateDiv}</div>
      </div>
    </div>
  )
}
