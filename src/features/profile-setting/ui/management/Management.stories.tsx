import type { Meta, StoryObj } from '@storybook/react'

import { Management } from './Management'

const meta: Meta<typeof Management> = {
  component: Management,
  title: 'Components/Management',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Management>

export const ManagementStory: Story = {
  args: {
    page: 1,
    itemsCountForPage: 10,
    totalCount: 126,
  },
}
