import type { Meta, StoryObj } from '@storybook/react'

import { Payments } from './Payments'

import { payments } from '@/shared/ui/table/constants'
import { Table } from '@/shared/ui/table/Table'

const meta: Meta<typeof Payments> = {
  component: Payments,
  title: 'Components/Payments',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Payments>

export const payment = () => {
  return <Table items={payments} />
}
