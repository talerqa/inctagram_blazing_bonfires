import { ImageDataType } from '@/shared/api/services/posts/posts.api.types'

// Функция для фильтрации дублирующихся фотографий
export function filterBestQualityImages(images: ImageDataType[] | undefined): ImageDataType[] {
  const uniqueImages: { [key: string]: ImageDataType } = {}

  // Фильтруем дубликаты, оставляя только лучшее качество
  images?.forEach(image => {
    const existingImage = uniqueImages[image.uploadId]

    if (!existingImage || image.fileSize > existingImage.fileSize) {
      uniqueImages[image.uploadId] = image
    }
  })

  // Преобразуем объект обратно в массив
  const filteredImages = Object.values(uniqueImages)

  return filteredImages
}
