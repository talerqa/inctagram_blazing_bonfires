export class LocalStorageManager {
  public static getNotificationsAccessToken = (): string | null => {
    return localStorage.getItem('accessToken')
  }
  public static setNotificationsAccessToken = (accessToken: string) => {
    return localStorage.setItem('accessToken', accessToken)
  }
  public static getLastNotificationCursorId = () => {
    return localStorage.getItem('lastNotificationCursorId')
  }
  public static setLastNotificationCursorId = (cursorId: string) => {
    return localStorage.setItem('lastNotificationCursorId', cursorId)
  }
}
