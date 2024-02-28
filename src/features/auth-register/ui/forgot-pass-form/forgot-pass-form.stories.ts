import { Meta, StoryObj } from '@storybook/react'

import { ForgotPass } from './forgot-pass-form'

const meta: Meta<typeof ForgotPass> = {
  title: 'Components/ForgotPassword',
  component: ForgotPass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ForgotPass>

export const Default: Story = {
  args: {
    email: 'Email',
    recaptcha: '',
  },
}
