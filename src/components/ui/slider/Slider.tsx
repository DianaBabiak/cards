import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'

import { Typography } from '@/components/ui/typography'
import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

type SliderDemoProps = {
  className?: string
  defaultValue?: [min: number, max: number]
  max: number
  min: number
  onValueChange?: ([min, max]: [min: number, max: number]) => void
  step?: number
} & ComponentPropsWithoutRef<typeof Slider.Root>

export const CustomSlider = forwardRef<ElementRef<typeof Slider.Root>, SliderDemoProps>(
  (props: SliderDemoProps, ref) => {
    const { className, defaultValue, max, min, onValueChange, step, ...restProps } = props

    const [value, setValue] = useState<number[]>(defaultValue || [min, max])

    const handleValueChange = (values: number[]) => {
      setValue(values)
      if (onValueChange) {
        onValueChange(values)
      }
    }

    return (
      <div className={`${s.customSliderWrapper} ${className ?? ''}`}>
        <MinMax minMax={value[0]} />
        <div className={s.sliderWrapper}>
          <Slider.Root
            className={s.sliderRoot}
            defaultValue={defaultValue}
            max={max}
            min={min}
            onValueChange={handleValueChange}
            step={step || 1}
            value={value}
            {...restProps}
            ref={ref}
          >
            <Slider.Track className={s.sliderTrack}>
              <Slider.Range className={s.sliderRange} />
            </Slider.Track>
            <Slider.Thumb className={s.sliderThumb} />
            <Slider.Thumb className={s.sliderThumb} />
          </Slider.Root>
        </div>
        <MinMax minMax={value[1]} />
      </div>
    )
  }
)

type MinMaxProps = {
  minMax: number
}

const MinMax = ({ minMax }: MinMaxProps) => (
  <Typography
    as={'div'}
    className={s.minMaxWrapper}
    colorBalance={100}
    colorTheme={'light'}
    variant={'body1'}
  >
    {minMax}
  </Typography>
)
