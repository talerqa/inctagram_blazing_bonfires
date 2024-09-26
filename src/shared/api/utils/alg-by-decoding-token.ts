export const algByDecodingToken = (accessToken: string) => {
  const payloadBase64 = accessToken.split('.')[1] // берем вторую часть JWT (Payload)
  const payloadString = atob(payloadBase64) // декодируем из Base64
  const payload = JSON.parse(payloadString) // превращаем строку в объект

  const expirationTime = payload.exp // это время в секундах с начала эпохи (Unix timestamp)
  const dateOfExpiration = new Date(expirationTime * 1000) // превращаем Unix timestamp в объект даты

  const isExpirationTimeLongerThanCurrent = expirationTime > Date.now() / 1000

  return {
    isExpirationTimeLongerThanCurrent,
    dateOfExpiration,
  }
}
