import { DEFAULT_STAMP, useOidc } from '@/lib/auth/oidc'

export type User = {
  givenName?: string
  familyName?: string
  stamp?: string
  roles?: string[]
}

export function useUser(): User | undefined {
  const { decodedIdToken } = useOidc()

  const user = {
    givenName: decodedIdToken?.given_name,
    familyName: decodedIdToken?.family_name,
    stamp: decodedIdToken?.timbre ?? DEFAULT_STAMP,
    roles: decodedIdToken?.realm_access.roles,
  }

  return user
}
