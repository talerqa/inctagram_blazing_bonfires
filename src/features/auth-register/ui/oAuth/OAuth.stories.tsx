import { GoogleOAuthProvider } from '@react-oauth/google'
import { Meta, StoryObj } from '@storybook/react'

import { OAuth } from '@/features/auth-register/ui/oAuth/OAuth'

const meta: Meta<typeof OAuth> = {
  title: 'Components/OAuth',
  component: OAuth,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OAuth>

export const oAuth = () => {
  return (
    <GoogleOAuthProvider
      clientId={'617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com'}
    >
      <OAuth />
    </GoogleOAuthProvider>
  )
}
