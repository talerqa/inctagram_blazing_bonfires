import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { OAuth } from '@/features/auth-register/ui/oAuth/OAuth'

// eslint-disable-next-line import/order
import { GoogleOAuthProvider } from '@react-oauth/google'

jest.mock('next/router', () => require('next-router-mock'))

describe('OAuth', () => {
  it('github and google imgs should be in the document', () => {
    render(
      <GoogleOAuthProvider
        clientId={'617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com'}
      >
        <OAuth />
      </GoogleOAuthProvider>
    )
    const altTextImgGoogle = screen.getByAltText(/google icon/i)
    const altTextImgGitHub = screen.getByAltText(/github icon/i)

    expect(altTextImgGoogle).toBeInTheDocument()
    expect(altTextImgGitHub).toBeInTheDocument()
  })
})
