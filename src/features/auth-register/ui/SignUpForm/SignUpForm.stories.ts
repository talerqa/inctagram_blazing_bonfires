import { Meta, StoryObj } from '@storybook/react'

import SignUpForm from './SignUpForm'

import { ReduxStoreProviderDecorator } from '@/app/providers/StoreProvider'

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/SignUp',
  component: SignUpForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof SignUpForm>

export const Default: Story = {
  args: {
    email: 'Enter email',
    password: 'Enter password',
    passwordConfirmation: 'Enter password confirmation',
    agreement: false,
  },
}
