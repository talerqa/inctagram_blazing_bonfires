import React from 'react'

import { Wizard } from 'react-use-wizard'

import CropProvider from '@/features/create-post/context/crop-provider'
import { AddPhoto } from '@/features/create-post/steps/add-photo/add-photo'
import { Cropping } from '@/features/create-post/steps/cropping/cropping'
import { Filters } from '@/features/create-post/steps/filters/filters'
import { Publication } from '@/features/create-post/steps/publication/publication'

const CreatePost = () => {
  return (
    <CropProvider>
      <Wizard>
        <AddPhoto />
        <Cropping />
        <Filters />
        <Publication />
      </Wizard>
    </CropProvider>
  )
}

export default CreatePost
