import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { CreateNewPassForm } from './create-new-pass-form'

describe('Create Password Form', () => {
  const onChange = jest.fn()

  // it('render form', () => {
  //   const { getByText } = render(<createNewPassForm />)
  //   const textInForm = getByText(/Your password must be between 6 and 20 characters/i)
  //   const button = screen.getByRole('button')
  //   const allInputPass = screen.getAllByPlaceholderText(/enter password/i)

  //   expect(textInForm).toBeInTheDocument()
  //   expect(button).toBeInTheDocument()
  //   expect(allInputPass).toHaveLength(2)
  // })

  // it('start - empty, changed - fill', async () => {
  //   render(<createNewPassForm />)
  //   const allInputPass = screen.getAllByPlaceholderText(/enter password/i)

  //   expect(allInputPass[0]).toBeEmptyDOMElement()
  //   expect(allInputPass[1]).toBeEmptyDOMElement()
  //   await userEvent.type(allInputPass[0], '123456789')
  //   expect(allInputPass[0]).toHaveValue('123456789')
  //   await userEvent.type(allInputPass[1], '0123456789')
  //   expect(allInputPass[1]).toHaveValue('0123456789')
  // })
})
