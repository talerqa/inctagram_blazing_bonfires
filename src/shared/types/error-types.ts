export type serverError = {
  data: {
    error: string
    messages: {
      message: string
    }[]
    statusCode: number
  }
  status: number
}
