import type { Meta, StoryObj } from '@storybook/react'

import { RoundCheckbox } from './RoundCheckbox'

const meta: Meta<typeof RoundCheckbox> = {
  component: RoundCheckbox,
  title: 'Example/roundCheckbox',
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof RoundCheckbox>

export const DefaultRoundCheckbox: { args: { checked: boolean; label: string } } = {
  args: {
    label: 'default',
    checked: false,
  },
}

export const CheckedRoundCheckbox: { args: { checked: boolean; label: string } } = {
  args: {
    label: 'checked',
    checked: true,
  },
}
