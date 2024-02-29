import { useEffect, useState } from 'react'

import * as RSlider from '@radix-ui/react-slider'

import s from './Slider.module.scss'

type SliderPropsType = {
  onSubmit?: (handleOnSubmit: number[]) => void
  defaultValue?: number[]
  max?: number
  min?: number
  step?: number
  value?: number[]
  minStepsBetweenThumbs?: number
  onValueChange: (value: number[]) => void
}

export const Slider = ({
  onSubmit,
  onValueChange,
  defaultValue = [0],
  max = 100,
  min = 0,
  step = 1,
  value,
}: SliderPropsType) => {
  return (
    <div className={s.sliderContainer}>
      <RSlider.Root
        className={s.SliderRoot}
        defaultValue={defaultValue}
        max={max}
        min={min}
        step={step}
        value={value}
        onValueChange={onValueChange}
        onValueCommit={onSubmit}
      >
        <RSlider.Track className={s.SliderTrack}>
          <RSlider.Range className={s.SliderRange} />
        </RSlider.Track>
        <RSlider.Thumb className={s.SliderThumb} />
      </RSlider.Root>
    </div>
  )
}
