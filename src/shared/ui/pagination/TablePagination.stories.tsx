import type { Meta, StoryObj } from '@storybook/react'

import { TablePagination } from './TablePagination'

const meta: Meta<typeof TablePagination> = {
  component: TablePagination,
  title: 'Example/tablePagination',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TablePagination>

export const pagination: Story = {
  args: {
    page: 1,
    itemsCountForPage: 10,
    totalCount: 126,
  },
}
