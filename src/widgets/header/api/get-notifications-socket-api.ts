import { io, Socket } from 'socket.io-client'

export class GetNotificationsSocketApi {
  static socket: null | Socket = null

  static createConnection(accessToken: string) {
    const queryParams = {
      query: {
        accessToken,
      },
    }

    this.socket = io(
      process.env.NEXT_PUBLIC_NOTIFICATIONS_SOCKET_API || 'https://inctagram.work/',
      queryParams
    )

    this.socket.on('connect', () => {
      console.log('connect to notifications socket')
    })

    this.socket.on('disconnect', e => {
      console.log('disconnect from notifications socket', e)
    })
  }

  static disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      console.log('Disconnected from notifications socket')
    }
  }
}
