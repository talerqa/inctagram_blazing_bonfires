import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { Button, ButtonSize, ButtonTheme } from './button'

describe('button component', () => {
  it('render button', () => {
    render(<Button />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('button clicked', async () => {
    const handleClick = jest.fn()

    render(<Button onClick={handleClick} />)
    const button = screen.getByRole('button')

    await userEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  it('button have classes', () => {
    render(<Button theme={ButtonTheme.FILLED} size={ButtonSize.SMALL} />)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('Button')
    expect(button).toHaveClass('filled')
    expect(button).toHaveClass('small')
  })
})
