import { ReactNode, useState } from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './DropDownMenu.module.scss'

export type DropDownMenuPropsType = {
  triggerIcon?: ReactNode
  children: ReactNode
}

export const DropdownMenu = ({ triggerIcon, children }: DropDownMenuPropsType) => {
  const [open, setOpen] = useState(false)

  return (
    <RDropdownMenu.Root open={open} onOpenChange={() => setOpen(!open)} modal={false}>
      <RDropdownMenu.Trigger asChild>
        <button className={s.IconButton} aria-label="Customise options">
          {triggerIcon}
        </button>
      </RDropdownMenu.Trigger>

      <RDropdownMenu.Portal>
        <RDropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5} alignOffset={2}>
          {children}
        </RDropdownMenu.Content>
      </RDropdownMenu.Portal>
    </RDropdownMenu.Root>
  )
}
