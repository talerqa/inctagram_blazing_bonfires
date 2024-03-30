/**
 * Преобразует массив файлов в массив Data URL изображений.
 * @param {File[]} imageFiles - Массив файлов для обработки.
 * @returns {Promise<string[]>} - Обещание, которое разрешается массивом Data URL изображений.
 */
export const processImageFiles = (imageFiles: File[]): Promise<string[]> => {
  return Promise.all<string>( // Указываем тип 'string' здесь
    imageFiles.map(file => {
      return new Promise<string>((resolve, reject) => {
        // Указываем тип 'string' здесь
        const reader = new FileReader()

        // Обработчик успешного чтения файла
        reader.onload = () => {
          // Разрешаем обещание с Data URL изображения
          resolve(reader.result as string)
        }

        // Обработчик ошибки при чтении файла
        reader.onerror = error => {
          // Отклоняем обещание и передаем ошибку
          reject(error)
        }

        // Начинаем асинхронное чтение файла в формате Data URL
        reader.readAsDataURL(file)
      })
    })
  )
}
