import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './header'

const meta: Meta<typeof Header> = {
  title: 'Example/header',
  component: Header,
}

export default meta
type Story = StoryObj<typeof Header>

export const Primary: Story = {}
