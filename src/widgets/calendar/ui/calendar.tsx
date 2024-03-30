import React, { forwardRef, useEffect, useState } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import type { Value } from 'react-multi-date-picker'
import DatePicker from 'react-multi-date-picker'

import styles from './calendar.module.scss'

import calendarCloseIcon from '@/shared/assets/icons/icons/calendar-close.svg'
import calendarOpenIcon from '@/shared/assets/icons/icons/calendar-open.svg'

type Props = {
  outsideOnChange: (newValue: Value) => void
  data?: Date | string | number
  classNameWrap?: string
}

export const Calendar = ({ outsideOnChange, classNameWrap, data }: Props) => {
  const minAge = new Date().setFullYear(new Date().getFullYear() - 13)
  const defaultValue = data ? new Date(data) : new Date(minAge)

  const { t } = useTranslation('common', { keyPrefix: 'Calendar' })
  const [value, setValue] = useState<Value>(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [data])

  const [isOpen, setIsOpen] = useState(false)
  const weekDays = [t('Su'), t('Mo'), t('Tu'), t('We'), t('Th'), t('Fr'), t('Sa')]
  const months = [
    t('January'),
    t('February'),
    t('March'),
    t('April'),
    t('May'),
    t('June'),
    t('July'),
    t('August'),
    t('September'),
    t('October'),
    t('November'),
    t('December'),
  ]

  const onChangeDate = (date: Value) => {
    const convertedDate = new Date(+JSON.stringify(date))

    setValue(convertedDate)
    outsideOnChange(convertedDate)
  }

  return (
    <div className={classNameWrap}>
      <DatePicker
        inputClass={
          minAge > Date.parse(value as string) ? styles.customInput : styles.customInputError
        }
        containerClassName={styles.container}
        value={value}
        monthYearSeparator=" "
        weekDays={weekDays}
        months={months}
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        arrow={false}
        showOtherDays
        format="DD.MM.YYYY"
        onOpen={() => {
          setIsOpen(true)
        }}
        onClose={() => setIsOpen(false)}
        // maxDate={minAge}
        placeholder="00.00.00"
        onChange={date => onChangeDate(date)}
        weekStartDayIndex={1}
        offsetY={1}
        mapDays={({ date }) => {
          let isWeekend = [0, 6].includes(date.weekDay.index)

          if (isWeekend) return { className: 'weekends' }
        }}
      />

      <Image
        src={isOpen ? calendarCloseIcon : calendarOpenIcon}
        alt="calendar"
        className={styles.calendarIcon}
      />
    </div>
  )
}
