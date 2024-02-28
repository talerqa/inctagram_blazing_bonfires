import { Meta, StoryObj } from '@storybook/react'

import { TableSkeleton as TSkeleton } from '@/shared/ui'

const meta = {
  component: TSkeleton,
  tags: ['autodocs'],
  title: 'UI/TableSkeleton',
} satisfies Meta<typeof TSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const TableSkeleton: Story = {
  args: {
    numRows: 10,
  },
}
