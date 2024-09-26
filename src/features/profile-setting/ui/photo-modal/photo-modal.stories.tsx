import type { Meta, StoryObj } from '@storybook/react'

import { PhotoModal } from './photo-modal'

const meta: Meta<typeof PhotoModal> = {
  title: 'Example/photoModal',
  component: PhotoModal,
}

export default meta
type Story = StoryObj<typeof PhotoModal>

export const PhotoModalButton: Story = {
  args: {
    closeWindow: () => '#',
  },
}
