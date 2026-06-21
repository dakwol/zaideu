'use client'
import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { classNames } from '@/shared/lib/utils'
import styles from '../Slider.module.scss'
const Slider = ({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) => {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max]
  )
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={classNames(styles.slider, className)}
      {...props}
    >
      <SliderPrimitive.Track data-slot="slider-track" className={styles.track}>
        <SliderPrimitive.Range data-slot="slider-range" className={styles.range} />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_value, index) => (
        <SliderPrimitive.Thumb data-slot="slider-thumb" key={index} className={styles.thumb} />
      ))}
    </SliderPrimitive.Root>
  )
}
export { Slider }
