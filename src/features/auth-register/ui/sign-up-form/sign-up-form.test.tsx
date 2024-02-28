import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import { SignUpForm } from '@/features/auth-register'

describe('signInForm Un Form', () => {
  it('render form', () => {
    render(<SignUpForm />)
    const textInForm = screen.getByText(/Do you have an account?/i)
    const allImg = screen.getAllByRole('img')
    const allButton = screen.getAllByRole('button')
    const allInputText = screen.getAllByRole('textbox')
    const allInputPass = screen.getAllByPlaceholderText(/enter password/i)

    expect(allImg).toHaveLength(4)
    expect(allButton).toHaveLength(2)
    expect(allInputText).toHaveLength(2)
    expect(allInputPass).toHaveLength(2)
    expect(textInForm).toBeInTheDocument()
  })
  it('input empty', () => {
    render(<SignUpForm />)
    expect(screen.getByPlaceholderText('Enter email')).toBeEmptyDOMElement()
    expect(screen.getByPlaceholderText('Enter name')).toBeEmptyDOMElement()
    expect(screen.getAllByPlaceholderText('Enter password')[0]).toBeEmptyDOMElement()
    expect(screen.getAllByPlaceholderText('Enter password')[1]).toBeEmptyDOMElement()
  })

  it('input changed', () => {
    render(<SignUpForm />)

    const inputName = screen.getByPlaceholderText('Enter name')

    expect(inputName).toBeEmptyDOMElement()
    fireEvent.change(inputName, {
      target: { value: 'Peter Parker' },
    })
    expect(inputName).toHaveValue('Peter Parker')
  })
})
