import { useState } from 'react'

export const useTruncateText = (
  text: string | undefined | null,
  value: number,
  semiTruncatedValue?: number
) => {
  const [isShowMoreActive, setIsShowMoreActive] = useState(false)

  const truncatedText = `${text?.substring(0, value)}`
  const semiFullText = `${text?.substring(0, semiTruncatedValue)}`
  const displayShowMore = String(text).length > value
  const dynamicText = displayShowMore && isShowMoreActive ? text : truncatedText
  const semiTruncatedDynamicText =
    displayShowMore && isShowMoreActive ? truncatedText : semiFullText

  return {
    dynamicText,
    setIsShowMoreActive,
    isShowMoreActive,
    displayShowMore,
    semiTruncatedDynamicText,
  }
}
