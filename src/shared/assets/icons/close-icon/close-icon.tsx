import * as React from 'react'
import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" ref={ref} {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="m6.705 6 2.15-2.145a.502.502 0 1 0-.71-.71L6 5.295l-2.145-2.15a.502.502 0 0 0-.71.71L5.295 6l-2.15 2.145a.5.5 0 0 0 .163.82.5.5 0 0 0 .547-.11L6 6.705l2.145 2.15a.5.5 0 0 0 .82-.163.5.5 0 0 0-.11-.547L6.705 6Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h12v12H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default memo(forwardRef(SvgComponent))
