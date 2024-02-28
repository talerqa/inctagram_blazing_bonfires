import type { Meta, StoryObj } from '@storybook/react'

import { Button, ButtonSize, ButtonTheme } from './button'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Example/button',
  parameters: {
    layout: 'centered',
  },
  argTypes: { onClick: { action: 'clicked' } },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const FilledButton: Story = {
  args: {
    children: 'Click',
    theme: ButtonTheme.FILLED,
    size: ButtonSize.MIDDLE,
  },
}

export const ClearButton: Story = {
  args: {
    children: 'Click',
    theme: ButtonTheme.CLEAR,
    size: ButtonSize.MIDDLE,
  },
}

export const SmallButton: Story = {
  args: {
    children: 'OK',
    theme: ButtonTheme.CLEAR,
    size: ButtonSize.SMALL,
  },
}

export const LargeButton: Story = {
  args: {
    children: 'Click',
    theme: ButtonTheme.FILLED,
    size: ButtonSize.LARGE,
  },
}

export const StretchedButton = () => {
  return (
    <div style={{ width: '400px' }}>
      <Button size={ButtonSize.STRETCHED}>Stretched</Button>
    </div>
  )
}
