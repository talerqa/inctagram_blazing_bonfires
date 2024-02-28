import * as React from 'react'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import style from './switcher.module.scss'

type Props = {
  description: string
  icon?: string | StaticImport
  alt?: string
}

export const OptionContent = ({ alt, description, icon }: Props) => {
  return (
    <div className={style.optionContent}>
      {!!icon && <Image src={icon} alt={alt ?? ''} width={20} />}
      <span className={style.description}>{description}</span>
    </div>
  )
}
