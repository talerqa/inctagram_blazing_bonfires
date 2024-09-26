import React from 'react'

type SquareIconProps = {
  color?: string
}

const SquareIcon: React.FC<SquareIconProps> = ({ color = '#8D9094' }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="16" height="16" rx="2" stroke={color} />
    </svg>
  )
}

export default SquareIcon
