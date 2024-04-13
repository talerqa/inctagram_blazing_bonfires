import { useContext } from 'react'

import { CropContext } from '@/features/create-post/context/crop-provider'

export const useImageCropContext = () => {
  const context = useContext(CropContext)

  if (!context) {
    throw new Error('useImageCropContext must be used with in a CropProvider')
  }

  return context
}
