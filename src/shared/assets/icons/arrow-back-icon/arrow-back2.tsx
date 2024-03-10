import * as React from 'react'
import { SVGProps, Ref, forwardRef, memo, MouseEventHandler } from 'react'
export const ArrowBack2 = memo(
  forwardRef(
    (
      {
        className,
        onClickHandler,
        width = 24,
        height = 24,
        fill = '#fff',
        ...rest
      }: SVGProps<SVGSVGElement> & {
        onClickHandler?: MouseEventHandler<SVGSVGElement>
      },
      ref: Ref<SVGSVGElement>
    ) => (
      <svg
        onClick={onClickHandler}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={fill}
        ref={ref}
        style={{ cursor: 'pointer' }}
        {...rest}
      >
        <g clipPath="url(#a)">
          <path
            fill={fill}
            d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1.001 1.001 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64Z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill={fill} d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </svg>
    )
  )
)
