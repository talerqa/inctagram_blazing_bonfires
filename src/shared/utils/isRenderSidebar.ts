import { RoutersPath } from '../constants/paths'

export const isRenderSidebar = (pathname: string) => {
  const pathWithoutSidebar: string[] = [
    RoutersPath.authExpiredVerificationLink,
    // RoutersPath.home,
    RoutersPath.signIn,
    RoutersPath.signUp,
    RoutersPath.sentEmail,
    RoutersPath.mergeAccounts,
    RoutersPath.invalidVerificationLink,
    RoutersPath.forgotPassword,
    RoutersPath.createNewPassword,
    RoutersPath.authConfirmedEmail,
    RoutersPath.authTermsOfService,
    RoutersPath.authPrivacyPolicy,
  ]

  return !pathWithoutSidebar.includes(pathname)
}
