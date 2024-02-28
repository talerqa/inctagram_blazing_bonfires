export type ServerSidePropsType<T> = {
  data: T
  endpointName: string
  fulfilledTimeStamp: number
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  isUninitialized: boolean
  originalArgs: number
  requestId: string
  startedTimeStamp: number
  status: string
}
