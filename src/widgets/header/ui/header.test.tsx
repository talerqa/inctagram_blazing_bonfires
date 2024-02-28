import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { Header } from './header'

describe('Header', () => {
  const onChange = jest.fn()

  it('render header', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    const link = screen.getByRole('link')

    // expect(textInForm).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(link).toBeInTheDocument()
    // expect(allInputPass).toHaveLength(2)
  })

  // it('start - empty, changed - fill', async () => {
  //   render(<CreateNewPass />)
  //   const allInputPass = screen.getAllByPlaceholderText(/enter password/i)

  //   expect(allInputPass[0]).toBeEmptyDOMElement()
  //   expect(allInputPass[1]).toBeEmptyDOMElement()
  //   await userEvent.type(allInputPass[0], '123456789')
  //   expect(allInputPass[0]).toHaveValue('123456789')
  //   await userEvent.type(allInputPass[1], '0123456789')
  //   expect(allInputPass[1]).toHaveValue('0123456789')
  // })
})
