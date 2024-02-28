import Resizer from 'react-image-file-resizer'

export function resizerImage(file: Blob) {
  return new Promise<string | Blob | File | ProgressEvent<FileReader>>(resolve => {
    Resizer.imageFileResizer(
      file,
      1024,
      1024,
      'JPEG',
      100,
      0,
      (uri: string | Blob | File | ProgressEvent<FileReader>) => {
        resolve(uri)
      },
      'file'
    )
  })
}

//1024*1024 ( less than 1mb)
