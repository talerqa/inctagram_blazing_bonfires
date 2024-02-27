import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import s from './Navbar.module.scss'

import { RoutersPath } from '@/shared/constants/paths'

export const Navbar = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const classNames = {
    uploadedPhotos: clsx(
      router.pathname === `${RoutersPath.superAdminUserProfile}/[id]` ? s['current-page'] : ''
    ),
    payments: clsx(
      router.pathname === `${RoutersPath.superAdminUserProfile}/[id]/payments`
        ? s['current-page']
        : ''
    ),
    followers: clsx(
      router.pathname === `${RoutersPath.superAdminUserProfile}/[id]/followers`
        ? s['current-page']
        : ''
    ),
    following: clsx(
      router.pathname === `${RoutersPath.superAdminUserProfile}/[id]/following`
        ? s['current-page']
        : ''
    ),
  }

  return (
    <nav className={s.navbar}>
      <Link href={`${RoutersPath.superAdminUserProfile}/${router.query.id}`}>
        <h3 className={classNames.uploadedPhotos}>{t('Navbar.UploadedPhotos')}</h3>
      </Link>
      <Link href={`${RoutersPath.superAdminUserProfile}/${router.query.id}/payments`}>
        <h3 className={classNames.payments}>{t('Navbar.Payments')}</h3>
      </Link>
      <Link href={`${RoutersPath.superAdminUserProfile}/${router.query.id}/followers`}>
        <h3 className={classNames.followers}>{t('Profile.Followers')}</h3>
      </Link>
      <Link href={`${RoutersPath.superAdminUserProfile}/${router.query.id}/following`}>
        <h3 className={classNames.following}>{t('Profile.Following')}</h3>
      </Link>
    </nav>
  )
}
