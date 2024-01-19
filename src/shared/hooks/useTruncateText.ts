import { useState } from 'react'

export const useTruncateText = (text: string | undefined, value: number) => {
  const [isShowMoreActive, setIsShowMoreActive] = useState(false)

  const truncatedText = `${text?.substring(0, value)}`
  /* todo точки  заменить*/
  const displayShowMore = String(text).length > value
  const fullText = displayShowMore && isShowMoreActive ? text : truncatedText

  return { fullText, setIsShowMoreActive, isShowMoreActive, displayShowMore }
}
