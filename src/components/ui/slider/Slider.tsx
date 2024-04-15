import { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect, useState } from 'react'

import { useAppSelector } from '@/common/hooks/hooks'
import { Typography } from '@/components/ui/typography'
import { isClearSelector } from '@/features/decksList/model/decksList/decksSelectors'
import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

type SliderDemoProps = {
  className?: string
  defaultValue?: [min: number, max: number]
  max: number
  min: number
  onValueChange?: ([min, max]: [min: number, max: number]) => void
  sliderName?: string
  step?: number
} & ComponentPropsWithoutRef<typeof Slider.Root>

export const CustomSlider = forwardRef<ElementRef<typeof Slider.Root>, SliderDemoProps>(
  (props: SliderDemoProps, ref) => {
    const {
      className,
      defaultValue,
      max,
      min,
      onValueChange,
      sliderName,
      step,
      value,
      ...restProps
    } = props

    const isClearSlider = useAppSelector(isClearSelector)

    const [currentValue, setCurrentValue] = useState(() => {
      const savedValues = localStorage.getItem('sliderValues')

      return savedValues ? JSON.parse(savedValues) : [min, max]
    })

    const handleValueChange = (values: number[]) => {
      setCurrentValue(values)
      localStorage.setItem('sliderValues', JSON.stringify(values))
      if (onValueChange) {
        onValueChange(values)
      }
    }

    useEffect(() => {
      if (isClearSlider) {
        setCurrentValue([min, max])
        localStorage.setItem('sliderValues', JSON.stringify([min, max]))
      }
    }, [isClearSlider])

    return (
      <div className={className ?? ''}>
        {sliderName && (
          <Typography colorBalance={100} colorTheme={'light'} variant={'body2'}>
            {sliderName}
          </Typography>
        )}
        <div className={s.customSliderWrapper}>
          <MinMax minMax={currentValue[0]} />
          <div className={s.sliderWrapper}>
            <Slider.Root
              className={s.sliderRoot}
              defaultValue={defaultValue}
              max={max}
              min={min}
              onValueChange={handleValueChange}
              step={step || 1}
              value={currentValue}
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
          <MinMax minMax={currentValue[1]} />
        </div>
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
