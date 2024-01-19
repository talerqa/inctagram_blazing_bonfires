import type { Preview } from '@storybook/react'
import { ApiDecorator, StyleDecorator } from '../src/shared/config/storybook'
import { StoreDecorator } from '../src/shared/providers/storeProvider'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [StyleDecorator, ApiDecorator, StoreDecorator],
}

export default preview
