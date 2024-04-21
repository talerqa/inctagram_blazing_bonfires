import { useTranslation } from 'next-i18next'

export const useFindDateDifference = () => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'Post' })

  return {
    findDateDifference: (date: string) => {
      const now = new Date()
      const updatedDate = new Date(date)

      const timeDifference = now.getTime() - updatedDate.getTime()
      const secondsDifference = Math.floor(timeDifference / 1000)
      const minutesDifference = Math.floor(secondsDifference / 60)
      const hoursDifference = Math.floor(minutesDifference / 60)
      const daysDifference = Math.floor(hoursDifference / 24)
      const weeksDifference = Math.floor(daysDifference / 7)
      const monthsDifference = Math.floor(weeksDifference / 4)
      const yearsDifference = Math.floor(monthsDifference / 12)

      //Pluralize depending on the selected language
      const pluralize = (count: number, unit: string, locale: string) => {
        const rules = new Intl.PluralRules(locale)
        const pluralForm = rules.select(count)

        const translationKey = `${unit}.${pluralForm}`

        return t(translationKey)
      }

      const currentLanguage = i18n.language

      if (yearsDifference < 0) {
        return `${yearsDifference} ${pluralize(yearsDifference, 'YearsAgo', currentLanguage)}`
      } else if (secondsDifference < 60) {
        return `${secondsDifference} ${pluralize(secondsDifference, 'SecondsAgo', currentLanguage)}`
      } else if (minutesDifference < 60) {
        return `${minutesDifference} ${pluralize(minutesDifference, 'MinutesAgo', currentLanguage)}`
      } else if (hoursDifference < 24) {
        return `${hoursDifference} ${pluralize(hoursDifference, 'HoursAgo', currentLanguage)}`
      } else if (daysDifference < 7) {
        return `${daysDifference} ${pluralize(daysDifference, 'DaysAgo', currentLanguage)}`
      } else if (weeksDifference < 4) {
        return `${weeksDifference} ${pluralize(weeksDifference, 'WeeksAgo', currentLanguage)}`
      } else if (monthsDifference < 12) {
        return `${monthsDifference} ${pluralize(monthsDifference, 'MonthsAgo', currentLanguage)}`
      }
    },
  }
}
