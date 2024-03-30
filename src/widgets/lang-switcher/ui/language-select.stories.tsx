import type { Meta, StoryObj } from '@storybook/react'

import { LanguageSelect } from './language-select'

const meta: Meta<typeof LanguageSelect> = {
  title: 'Example/languageSelect',
  component: LanguageSelect,
}

export default meta

type Story = StoryObj<typeof LanguageSelect>

export const Primary: Story = {}
