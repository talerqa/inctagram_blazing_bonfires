import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { OptionContent } from './option-content'
import style from './switcher.module.scss'

import arrow from '@/shared/assets/icons/lang-select/select-arrow.svg'
import { optionsType } from '@/shared/types/option-switcher-types'

type Props = {
  options: optionsType[]
  initialValue: string
  changeHandlerExtraFn?: (argChangeHandler: string) => void
}

export const Switcher = ({ options, initialValue, changeHandlerExtraFn }: Props) => {
  const refSelect = useRef<HTMLDivElement | null>(null)
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [selectedValue, setSelectValue] = useState(initialValue)

  const openSelectHandler = () => setIsOpenSelect(!isOpenSelect)

  const changeHandler = (option: string) => {
    setSelectValue(option)
    openSelectHandler()
    changeHandlerExtraFn && changeHandlerExtraFn(option)
  }

  const closeOpenMenus = (e: DocumentEventMap['mousedown']) => {
    if (
      refSelect.current &&
      isOpenSelect &&
      !refSelect.current!.contains(e.target as HTMLDivElement)
    ) {
      setIsOpenSelect(false)
    }
  }

  const { shortDescription, description, icon } =
    options.find(el => el.shortDescription === selectedValue) || options[0]

  useEffect(() => {
    if (isOpenSelect) {
      document.addEventListener('mousedown', closeOpenMenus)
    }

    return () => {
      document.removeEventListener('mousedown', closeOpenMenus)
    }
  }, [isOpenSelect])

  return (
    <div className={style.select} ref={refSelect}>
      {!!selectedValue && (
        <div className={style.selectContent} onClick={openSelectHandler}>
          <OptionContent alt={shortDescription} icon={icon} description={description} />
          <Image
            src={arrow}
            alt="Arrow"
            className={style.arrowImg}
            style={{ transform: isOpenSelect ? 'rotate(180deg)' : 'rotate(0)' }}
          />
        </div>
      )}
      {isOpenSelect && (
        <div className={style.optionList}>
          {options.map(el => (
            <div
              key={el.description}
              className={style.option}
              onClick={() => changeHandler(el.shortDescription)}
            >
              <OptionContent
                alt={el.shortDescription}
                icon={el.icon}
                description={el.description}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
