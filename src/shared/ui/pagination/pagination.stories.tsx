import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './pagination'

const meta = {
  argTypes: {},
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber)
    }

    return (
      <Pagination
        handlePageChange={handlePageChange}
        totalPages={1}
        totalCount={100}
        itemsPerPage={10}
        currentPage={currentPage}
        handleSetItemsPerPage={() => {}}
        selectOptions={['10', '20', '30', '40', '50']}
      />
    )
  },
  args: {
    handlePageChange: () => {},
    totalPages: 1,
    totalCount: 100,
    itemsPerPage: 10,
    siblingCount: 2,
    currentPage: 1,
    selectOptions: ['10', '20', '30', '40', '50'],
  },
}
