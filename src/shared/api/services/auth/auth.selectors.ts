import { RootState } from '@/shared/providers/store-provider'

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
