import Image from 'next/image'

import appleIcon from '@/shared/assets/icons/devices/apple.svg'

interface IProps {
  name: string
  size: string
  color: string
}

export const SvgGenerator = ({ name, size, color }: IProps) => {
  switch (name) {
    case 'apple':
      return <Image src={appleIcon} alt="apple icon" sizes={size} />
    case 'desx':
      return (
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={size}
          viewBox="0,0,256,256"
        >
          <g
            fill={color}
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
            style={{ mixBlendMode: 'normal' }}
          >
            <g transform="translate(-0.00058,0.00009) scale(0.5,0.5)">
              <g id="7935ec95c421cee6d86eb22ecd114eed">
                <path d="M248.644,123.476c-5.45,-29.71 8.598,-60.285 25.516,-80.89c18.645,-22.735 50.642,-40.17 77.986,-42.086c4.619,31.149 -8.093,61.498 -24.826,82.965c-17.95,23.062 -48.812,40.946 -78.676,40.011zM409.034,231.131c8.461,-23.606 25.223,-44.845 51.227,-59.175c-26.278,-32.792 -63.173,-51.83 -97.99,-51.83c-46.065,0 -65.542,21.947 -97.538,21.947c-32.96,0 -57.965,-21.947 -97.866,-21.947c-39.127,0 -80.776,23.848 -107.19,64.577c-9.712,15.055 -16.291,33.758 -19.879,54.59c-9.956,58.439 4.916,134.557 49.279,202.144c21.57,32.796 50.321,69.737 87.881,70.059c33.459,0.327 42.951,-21.392 88.246,-21.616c45.362,-0.258 53.959,21.841 87.372,21.522c37.571,-0.317 67.906,-41.199 89.476,-73.991c15.359,-23.532 21.167,-35.418 33.11,-62.023c-60.727,-22.901 -85.703,-89.817 -66.128,-144.257z"></path>
              </g>
            </g>
          </g>
        </svg>
      )
    default:
      return (
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={size}
          viewBox="0,0,256,256"
        >
          <g
            fill={color}
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
            style={{ mixBlendMode: 'normal' }}
          >
            <g transform="translate(-0.00058,0.00009) scale(0.5,0.5)">
              <g id="7935ec95c421cee6d86eb22ecd114eed">
                <path d="M248.644,123.476c-5.45,-29.71 8.598,-60.285 25.516,-80.89c18.645,-22.735 50.642,-40.17 77.986,-42.086c4.619,31.149 -8.093,61.498 -24.826,82.965c-17.95,23.062 -48.812,40.946 -78.676,40.011zM409.034,231.131c8.461,-23.606 25.223,-44.845 51.227,-59.175c-26.278,-32.792 -63.173,-51.83 -97.99,-51.83c-46.065,0 -65.542,21.947 -97.538,21.947c-32.96,0 -57.965,-21.947 -97.866,-21.947c-39.127,0 -80.776,23.848 -107.19,64.577c-9.712,15.055 -16.291,33.758 -19.879,54.59c-9.956,58.439 4.916,134.557 49.279,202.144c21.57,32.796 50.321,69.737 87.881,70.059c33.459,0.327 42.951,-21.392 88.246,-21.616c45.362,-0.258 53.959,21.841 87.372,21.522c37.571,-0.317 67.906,-41.199 89.476,-73.991c15.359,-23.532 21.167,-35.418 33.11,-62.023c-60.727,-22.901 -85.703,-89.817 -66.128,-144.257z"></path>
              </g>
            </g>
          </g>
        </svg>
      )
  }
}