import type { Meta, StoryObj } from '@storybook/react'

import { Table } from './Table'

import { SubscriptionDataType } from '@/shared/api/services/subscriptions/subscriptions.api.types'

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Example/table',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Table>
const items: Array<SubscriptionDataType> = []

export const EmptyTable: () => JSX.Element = () => <Table items={items} />
