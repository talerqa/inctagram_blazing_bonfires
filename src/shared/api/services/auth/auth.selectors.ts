import { RootState } from '@/shared/providers/storeProvider'

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
