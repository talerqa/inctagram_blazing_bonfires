import type { Meta, StoryObj } from '@storybook/react'

import { LanguageSelect } from './LanguageSelect'

const meta: Meta<typeof LanguageSelect> = {
  title: 'Example/LanguageSelect',
  component: LanguageSelect,
}

export default meta

type Story = StoryObj<typeof LanguageSelect>

export const Primary: Story = {}
