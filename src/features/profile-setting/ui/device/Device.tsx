import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import styles from './Device.module.scss'

import { UserSessionsType } from '@/shared/api'
import desktopImage from '@/shared/assets/icons/devices/lightIcons/desktop.svg'
import mobileImage from '@/shared/assets/icons/devices/lightIcons/mobile.svg'
import logoutImg from '@/shared/assets/icons/logout/logout.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui'
import { IconDevice } from '@/shared/ui/iconDevice/IconDevice'

type Props = {
  isCurrent: boolean
  logoutCallback?: (id: number) => void
  sessionData: UserSessionsType
}
export const Device = ({ isCurrent, logoutCallback, sessionData }: Props) => {
  const { deviceType, deviceId, deviceName, osName, browserName, lastActive, osVersion, ip } =
    sessionData

  const { t } = useTranslation('common', { keyPrefix: 'Auth' })

  const lastActiveDate = new Date(lastActive).toLocaleDateString()
  const deviceInfo = `${osName} ${osVersion} ${deviceName || ''} ${browserName}`

  return (
    <>
      <div className={styles.container}>
        <section>
          {isCurrent ? (
            <>
              <IconDevice osName={osName} isCurrent={isCurrent} browserName={browserName} />
              <div className={styles.description}>
                <h4>{browserName}</h4>
                <p>IP: {ip}</p>
              </div>
            </>
          ) : (
            <>
              <Image src={deviceType === 'mobile' ? mobileImage : desktopImage} alt="device" />
              <div className={styles.description}>
                <h4>{deviceInfo}</h4>
                <p>IP: {ip}</p>
                <p>Last visit: {lastActiveDate}</p>
              </div>
            </>
          )}
        </section>
        {!isCurrent && logoutCallback && (
          <div>
            <Button
              className={styles.logOut}
              theme={ButtonTheme.CLEAR}
              size={ButtonSize.STRETCHED}
              onClick={() => {
                logoutCallback(deviceId)
              }}
            >
              <Image src={logoutImg} alt={''} />
              <span className={styles.description}>{t('LogOut')}</span>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
