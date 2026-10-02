import type { RegistryRelease, ReleaseRequest } from '@/models/releases'

/** Check whether a release or a release request already targets the provided version. */
export function hasReleaseForVersion(
  versionId: string | undefined,
  releases: RegistryRelease[],
  pendingRequests: ReleaseRequest[],
): boolean {
  if (versionId === undefined) {
    return false
  }
  return (
    releases.some((release) => release.poguesVersionId === versionId) ||
    pendingRequests.some((request) => request.poguesVersionId === versionId)
  )
}
