import { Meta, StoryObj } from '@storybook/react'

import { PostModal } from './post-modal'

const meta: Meta<typeof PostModal> = {
  title: 'Components/PostModal',
  component: PostModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PostModal>

export const Default: Story = {}
