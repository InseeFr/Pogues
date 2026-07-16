import { DEFAULT_STAMP, useOidc } from '@/lib/auth/oidc'
import { getStampFromEmail } from '@/utils/utils'

export type User = {
  givenName?: string
  familyName?: string
  stamp?: string
  roles?: string[]
}

export function useUser(): User | undefined {
  const { decodedIdToken } = useOidc()

  const stamp =
    decodedIdToken?.timbre ??
    getStampFromEmail(decodedIdToken?.email) ??
    DEFAULT_STAMP

  const user = {
    givenName: decodedIdToken?.given_name,
    familyName: decodedIdToken?.family_name,
    stamp,
  }

  return user
}
