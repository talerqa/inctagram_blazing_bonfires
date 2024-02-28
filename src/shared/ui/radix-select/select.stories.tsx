import { Meta, StoryObj } from '@storybook/react'

import { RadixSelect } from '@/shared/ui'

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
  },
  component: RadixSelect,
  tags: ['autodocs'],
  title: 'UI/SelectMenu',
} satisfies Meta<typeof RadixSelect>

export default meta
type Story = StoryObj<typeof meta>

export const SelectMenu: Story = {
  args: {
    options: ['hello', 'goodbye', 'how are you?'],
    title: 'Select-box',
    itemsPerPage: 10,
  },
}
