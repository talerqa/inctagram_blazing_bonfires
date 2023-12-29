import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'

import { Management } from '@/features/profile-setting'
import { StoreProvider } from '@/shared/providers/storeProvider'

jest.mock('next/router', () => require('next-router-mock'))

describe('Management', () => {
  it('title should be in the document', () => {
    render(
      <StoreProvider>
        <Management />
      </StoreProvider>
    )
    const title = screen.getByText(/Account type:/i)

    expect(title).toBeInTheDocument()
  })
})
