import type { RegistryRelease, ReleaseRequest } from '@/models/releases'
import type { Version } from '@/models/version'

/** Return the id of the most recent version among the provided versions. */
export function getLatestVersionId(versions: Version[]): string | undefined {
  return versions.reduce<Version | undefined>((latest, version) => {
    if (latest === undefined) {
      return version
    }
    const isMoreRecent =
      new Date(version.timestamp).getTime() >
      new Date(latest.timestamp).getTime()
    return isMoreRecent ? version : latest
  }, undefined)?.id
}

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
