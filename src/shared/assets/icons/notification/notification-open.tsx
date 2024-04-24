import * as React from 'react'
import { SVGProps } from 'react'
export const NotificationOpen = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#397DF6"
      fillRule="evenodd"
      d="M14 18.341c0 .9-.916 1.66-2 1.66s-2-.76-2-1.66v-.34h4v.34Zm6.52-3.134-1.8-1.803V8.936c0-3.48-2.502-6.437-5.821-6.877a6.724 6.724 0 0 0-5.316 1.607A6.731 6.731 0 0 0 5.28 8.727l-.001 4.677-1.8 1.804a1.63 1.63 0 0 0-.354 1.782c.255.613.848 1.01 1.512 1.01H8v.341c0 2.018 1.794 3.66 4 3.66s4-1.642 4-3.66v-.34h3.362a1.63 1.63 0 0 0 1.51-1.01 1.632 1.632 0 0 0-.351-1.784Z"
      clipRule="evenodd"
    />
    <mask
      id="a"
      width={19}
      height={21}
      x={2}
      y={2}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M14 18.341c0 .9-.916 1.66-2 1.66s-2-.76-2-1.66v-.34h4v.34Zm6.52-3.134-1.8-1.803V8.936c0-3.48-2.502-6.437-5.821-6.877a6.724 6.724 0 0 0-5.316 1.607A6.731 6.731 0 0 0 5.28 8.727l-.001 4.677-1.8 1.804a1.63 1.63 0 0 0-.354 1.782c.255.613.848 1.01 1.512 1.01H8v.341c0 2.018 1.794 3.66 4 3.66s4-1.642 4-3.66v-.34h3.362a1.63 1.63 0 0 0 1.51-1.01 1.632 1.632 0 0 0-.351-1.784Z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#a)">
      <path fill="#397DF6" d="M0 0h24v24H0z" />
    </g>
  </svg>
)
