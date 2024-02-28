import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { ForgotPass } from './forgot-pass-form'

describe('Forgot Password Form', () => {
  const onChange = jest.fn()

  it('render form', () => {
    const { getByText } = render(<ForgotPass />)
    const textInForm = getByText(
      /Enter your email address and we will send you further instructions/i
    )
    const inputEmail = screen.getByPlaceholderText('Enter email')
    const allInputText = screen.getAllByRole('textbox')

    expect(textInForm).toBeInTheDocument()
    expect(allInputText).toHaveLength(1)
    expect(inputEmail).toBeInTheDocument()
  })

  it('start - empty, changed - fill', async () => {
    render(<ForgotPass />)
    const inputEmail = screen.getByPlaceholderText('Enter email')

    expect(inputEmail).toBeEmptyDOMElement()
    await userEvent.type(inputEmail, 'peter.parker@gmail.com')
    expect(inputEmail).toHaveValue('peter.parker@gmail.com')
  })

  it('checkbox changed', async () => {
    render(<ForgotPass />)

    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })
})
