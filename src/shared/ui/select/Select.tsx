import React, { ChangeEvent, CSSProperties, DetailedHTMLProps, SelectHTMLAttributes } from 'react'

import styles from './Select.module.scss'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
  st?: CSSProperties | undefined
}

export const Select: React.FC<SuperSelectPropsType> = ({
  st,
  options,
  className,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const mappedOptions: any[] = options
    ? options.map(o => (
        <option id={'hw7-option-' + o.id} className={styles.option} key={o.id} value={o.id}>
          {o.value}
        </option>
      ))
    : [] // map options with key

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChangeOption) {
      onChangeOption(e.currentTarget.value)
    }
  }

  const finalSelectClassName = styles.select + (className ? ' ' + className : '')

  return (
    <select className={finalSelectClassName} onChange={onChangeCallback} {...restProps} style={st}>
      {mappedOptions}
    </select>
  )
}
