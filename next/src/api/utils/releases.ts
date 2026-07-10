import { TargetModes } from '@/models/questionnaires'
import type { RegistryRelease, ReleaseRequest } from '@/models/releases'

import type {
  RegistryReleaseDTO,
  ReleaseRequestDTO,
  TargetModesDTO,
} from '../models/releaseDTO'

/** Compute registry releases from API data. */
export function computeRegistryReleases(
  dtos: RegistryReleaseDTO[],
): RegistryRelease[] {
  return dtos.map((dto) => computeRegistryRelease(dto))
}

/** Compute a registry release from API data. */
export function computeRegistryRelease(
  dto: RegistryReleaseDTO,
): RegistryRelease {
  return {
    ...dto,
    mode: computeTargetModes(dto.mode),
  }
}

/** Compute a registry release DTO from model data. */
export function computeRegistryReleaseDTO(
  release: RegistryRelease,
): RegistryReleaseDTO {
  return {
    ...release,
    mode: computeTargetModesDTO(release.mode),
  }
}

/** Compute release requests from API data. */
export function computeReleaseRequests(
  dtos: ReleaseRequestDTO[],
): ReleaseRequest[] {
  return dtos.map((dto) => computeReleaseRequest(dto))
}

/** Compute a release request from API data. */
export function computeReleaseRequest(dto: ReleaseRequestDTO): ReleaseRequest {
  return {
    ...dto,
    mode: computeTargetModes(dto.mode),
  }
}

/** Compute a release request DTO from model data. */
export function computeReleaseRequestDTO(
  request: ReleaseRequest,
): ReleaseRequestDTO {
  return {
    ...request,
    mode: computeTargetModesDTO(request.mode),
  }
}

function computeTargetModes(mode: TargetModesDTO): TargetModes {
  switch (mode) {
    case 'CAWI':
      return TargetModes.CAWI
    case 'CAPI':
      return TargetModes.CAPI
    case 'PAPI':
      return TargetModes.PAPI
    case 'CATI':
      return TargetModes.CATI
    default:
      throw new Error('Unknown target mode')
  }
}

function computeTargetModesDTO(mode: TargetModes): TargetModesDTO {
  switch (mode) {
    case TargetModes.CAWI:
      return 'CAWI'
    case TargetModes.CAPI:
      return 'CAPI'
    case TargetModes.PAPI:
      return 'PAPI'
    case TargetModes.CATI:
      return 'CATI'
    default:
      throw new Error('Unknown target mode')
  }
}
