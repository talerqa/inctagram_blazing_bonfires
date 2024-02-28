import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './label.module.scss'

import { Text } from '@/shared/ui/text/text'
type Props = {
  label: string | undefined
} & ComponentPropsWithoutRef<typeof Text>

export const Label = (props: Props) => {
  const { className, label } = props
  const classLabel = clsx(s.label, className)

  return (
    label && (
      <Text as={'label'} className={classLabel} htmlFor={label}>
        {label}
      </Text>
    )
  )
}
