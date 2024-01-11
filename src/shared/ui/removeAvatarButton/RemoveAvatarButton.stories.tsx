import type { Meta, StoryObj } from '@storybook/react'

import { RemoveAvatarButton } from '@/shared/ui'

const meta: Meta<typeof RemoveAvatarButton> = {
  component: RemoveAvatarButton,
  title: 'Example/RemoveAvatarButton',
}

export default meta
type Story = StoryObj<typeof RemoveAvatarButton>

export const RoundRedButton: Story = {
  args: {},
}
