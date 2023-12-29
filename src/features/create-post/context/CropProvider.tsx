import React, { createContext, ReactNode, useContext, useState } from 'react'

import NextImage from 'next/image'

import { CanvasFilters } from '@/features/create-post/constants/canvasFilters'
import { processImageFiles } from '@/features/create-post/utils/processImageFiles'
import create from '@/shared/assets/icons/sideBar/create.svg'

export type PhotoType = {
  url: string
  width: number
  height: number
  position: {
    x: number
    y: number
  }
  filter: number[]
  croppedUrl: string
  filteredUrl: string
  zoom: number
  originalAspect: number
  currentAspect: number
}

const initialState: PhotoType[] = [
  {
    url: '',
    croppedUrl: '',
    filteredUrl: '',
    width: 0,
    height: 0,
    position: {
      x: 0,
      y: 0,
    },
    filter: [],
    zoom: 1,
    originalAspect: 0,
    currentAspect: 0,
  },
]

export type CropContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  photos: PhotoType[]
  setPhotoList: (files: FileList) => void
  setCroppedUrl: (croppedUrl: string, index: number) => void
  setFilteredUrl: (filteredUrl: string, index: number) => void
  setZoom: (index: number) => (zoom: number) => void
  originalAspect: number
  handleAspectRatioClick: (index: number) => (aspectRatio: number) => void
  setPosition: (index: number) => (position: { x: number; y: number }) => void
  setFilter: (index: number) => (filter: number[]) => void
  setNewPhotoList: (files: FileList) => void
  deletePhoto: (deleteIndex: number) => void
  isOpenModal: boolean
  setIsOpenModal: (isOpenModal: boolean) => void
  resetData: () => void
  setIsSelectFromComputerOpen: (isSelectFromComputerOpen: boolean) => void
  isSelectFromComputerOpen: boolean
}

export const CropContext = createContext<CropContextType | undefined>(undefined)

type Props = {
  children: ReactNode
}

const CropProvider: React.FC<Props> = ({ children }) => {
  // состояние модалки (открыта/закрыта)
  const [isOpen, setIsOpen] = useState(false)

  const [isOpenModal, setIsOpenModal] = useState(false)

  // массив фотографий
  const [photos, setPhotos] = useState<PhotoType[]>(initialState)

  // открытие компонента ImagePublication (Publication) при нажатии кнопки "Select from Computer" (AddPhoto)
  const [isSelectFromComputerOpen, setIsSelectFromComputerOpen] = useState(false)

  // обработка фотографий и запись в массив
  const setPhotoList = (files: FileList) => {
    const maxPhotos = 10

    processImageFiles(Array.from(files))
      .then(imageDataUrls => {
        const limitedImageDataUrls = imageDataUrls.slice(0, maxPhotos)
        const photosPromises = limitedImageDataUrls.map(url => {
          return new Promise((resolve, reject) => {
            const image = new Image()

            image.src = url

            image.onload = () => {
              resolve({
                url,
                width: image.width,
                height: image.height,
                croppedUrl: url,
                filteredUrl: url,
                zoom: 1,
                originalAspect: image.width / image.height,
                currentAspect: image.width / image.height,
                position: {
                  x: 0,
                  y: 0,
                },
                filter: CanvasFilters.NONE,
              })
            }

            image.onerror = () => {
              reject(new Error('Failed to load image.'))
            }
          })
        })

        return Promise.all(photosPromises)
      })
      .then(photos => {
        setPhotos(photos as PhotoType[])
      })
      .catch(error => {
        // Обработка ошибки при загрузке изображения
        console.error('Error loading images:', error)
      })
  }

  //обработка и добавление фотографий в существующий массив
  const setNewPhotoList = (files: FileList) => {
    processImageFiles(Array.from(files))
      .then(imageDataUrls => {
        const newPhotosPromises = imageDataUrls.map(url => {
          return new Promise((resolve, reject) => {
            const image = new Image()

            image.src = url

            image.onload = () => {
              resolve({
                url,
                width: image.width,
                height: image.height,
                croppedUrl: url,
                filteredUrl: url,
                zoom: 1,
                originalAspect: image.width / image.height,
                currentAspect: image.width / image.height,
                position: {
                  x: 0,
                  y: 0,
                },
                filter: CanvasFilters.NONE,
              })
            }

            image.onerror = () => {
              reject(new Error('Failed to load image.'))
            }
          })
        })

        return Promise.all(newPhotosPromises)
      })
      .then(newPhotos => {
        const updatedPhotos = photos.concat(newPhotos as PhotoType[])

        setPhotos(updatedPhotos)
      })
      .catch(error => {
        console.error('Error loading images:', error)
      })
  }
  // оригинальное соотношение сторон
  const originalAspect = photos[0].width / photos[0].height

  // запись в массив обрезанной фотографии
  const setCroppedUrl = (croppedUrl: string, index: number) => {
    const newPhotos = [...photos]

    newPhotos[index].croppedUrl = croppedUrl
    setPhotos(newPhotos)
  }

  // запись в массив отфильтрованной фотографии
  const setFilteredUrl = (filteredUrl: string, index: number) => {
    const newPhotos = [...photos]

    newPhotos[index].filteredUrl = filteredUrl
    setPhotos(newPhotos)
  }

  // zoom
  const generateSetZoomFunc = (index: number) => (zoom: number) => {
    const newPhotos = [...photos]

    newPhotos[index].zoom = zoom
    setPhotos(newPhotos)
  }

  // filter
  const generateSetFilterFunc = (index: number) => (filter: number[]) => {
    const newPhotos = [...photos]

    newPhotos[index].filter = filter
    setPhotos(newPhotos)
  }

  // aspect ratio
  const generateHandleAspectRatioFunc = (index: number) => (aspectRatio: number) => {
    const newPhotos = [...photos]

    newPhotos[index].currentAspect = aspectRatio
    setPhotos(newPhotos)
  }

  // position
  const generateSetPositionFunc = (index: number) => (position: { x: number; y: number }) => {
    const newPhotos = [...photos]

    newPhotos[index].position = position
    setPhotos(newPhotos)
  }
  // удаление фотографии из массива
  const deletePhoto = (deleteIndex: number) => {
    const updatedPhotos = photos.filter((photo, index) => index !== deleteIndex)

    setPhotos(updatedPhotos)
  }

  // очистка черновика фотографий
  const resetData = () => {
    const resetPhotos = photos.map(photo => ({
      ...photo,
      filteredUrl: photo.croppedUrl,
      filter: CanvasFilters.NONE,
    }))

    setPhotos(resetPhotos)
  }

  return (
    <CropContext.Provider
      value={{
        isOpen,
        setIsOpen,
        photos,
        setPhotoList,
        originalAspect,
        setCroppedUrl,
        setFilteredUrl,
        setZoom: generateSetZoomFunc,
        handleAspectRatioClick: generateHandleAspectRatioFunc,
        setPosition: generateSetPositionFunc,
        setFilter: generateSetFilterFunc,
        setNewPhotoList,
        deletePhoto,
        isOpenModal,
        setIsOpenModal,
        resetData,
        setIsSelectFromComputerOpen,
        isSelectFromComputerOpen,
      }}
    >
      <NextImage src={create} alt={''} onClick={() => setIsOpen(true)} />
      {children}
    </CropContext.Provider>
  )
}

export const useImageCropContext = () => {
  const context = useContext(CropContext)

  if (!context) {
    throw new Error('useImageCropContext must be used with in a CropProvider')
  }

  return context
}
export default CropProvider
