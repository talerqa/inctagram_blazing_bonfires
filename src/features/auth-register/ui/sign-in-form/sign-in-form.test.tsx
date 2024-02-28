import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { SignInForm } from '@/features/auth-register'

describe('signInForm Un Form', () => {
  it('render form', () => {
    render(<SignInForm />)
    const textInForm = screen.getByText(/Email/i)

    expect(textInForm).toBeInTheDocument()
  })
})
