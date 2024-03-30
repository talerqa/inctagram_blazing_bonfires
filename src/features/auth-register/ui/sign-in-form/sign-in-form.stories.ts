import { Meta, StoryObj } from '@storybook/react'

import { SignInForm } from '@/features/auth-register'

const meta: Meta<typeof SignInForm> = {
  title: 'Components/SignInForm',
  component: SignInForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SignInForm>

export const Default: Story = {
  args: {
    email: 'Enter email',
    password: 'Enter password',
  },
}
