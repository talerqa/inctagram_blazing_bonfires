import { useCallback } from 'react'

import Image from 'next/image'

import { findPathSVG } from '@/shared/utils/icon-generator'

type Props = {
  osName: string
  browserName: string
  size?: string
  theme?: string
  isCurrent: boolean
}

export const IconDevice = ({ osName, isCurrent, theme, browserName }: Props) => {
  const path = useCallback(() => {
    const displayIcon = isCurrent ? browserName : osName

    return findPathSVG(displayIcon, isCurrent, theme)
  }, [theme, osName, browserName, isCurrent])

  return (
    <Image src={path()} alt={`icon ${isCurrent ? browserName : osName}`} width={48} height={48} />
  )
}
