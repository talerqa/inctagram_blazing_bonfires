import { ReactNode, useState } from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './drop-down-menu.module.scss'

export type DropDownMenuPropsType = {
  triggerIcon?: ReactNode
  children: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

export const DropdownMenu = ({
  triggerIcon,
  side = 'left',
  align = 'start',
  children,
}: DropDownMenuPropsType) => {
  const [open, setOpen] = useState(false)

  return (
    <RDropdownMenu.Root open={open} onOpenChange={() => setOpen(!open)} modal={false}>
      <RDropdownMenu.Trigger asChild>
        <button className={s.IconButton} aria-label="Customise options">
          {triggerIcon}
        </button>
      </RDropdownMenu.Trigger>

      <RDropdownMenu.Portal>
        <RDropdownMenu.Content
          side={side}
          align={align}
          className={s.DropdownMenuContent}
          sideOffset={5}
          alignOffset={2}
        >
          {children}
        </RDropdownMenu.Content>
      </RDropdownMenu.Portal>
    </RDropdownMenu.Root>
  )
}
