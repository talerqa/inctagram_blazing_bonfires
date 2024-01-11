export type LoginFormType = {
  email: string
  password: string
}

export type LoginType = {
  accessToken: string
}
export type LoginViaGoogleResponseType = {
  accessToken: string
  email: string
}

export type LogoutType = {
  statusCode: string
  messages: [
    {
      message: string
      field: string
    },
  ]
  error: string | null
}

export type SignUpType = {
  userName: string
  email: string
  password: string
  passwordConfirmation: string
  agreement: boolean
}

export type PasswordRecoveryType = {
  email: string
  recaptcha: string
}

export type NewPasswordType = {
  newPassword: string
  recoveryCode?: string | string[]
}
export type ResendVerificationLinkType = {
  email: string
  baseUrl: string
}

export type UserType = {
  id?: number
  userName: string
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  city?: string
  dateOfBirth?: Date
  aboutMe?: string
  avatars?: [
    {
      url?: string
      width: number
      height: number
      fileSize: number
    },
  ]
}
