import type { FormValues } from '@/components/release/form/schema'
import { TargetModes } from '@/models/questionnaires'
import type { TargetMode } from '@/models/questionnaires'
import type {
  RegistryCollectionInstrument,
  RegistryRelease,
  ReleaseRequest,
} from '@/models/releases'

import type {
  CreateReleaseDTO,
  RegistryCollectionInstrumentDTO,
  RegistryReleaseDTO,
  ReleaseRequestDTO,
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
    releaseDate: new Date(dto.releaseDate).getTime(),
    collectionInstruments: dto.collectionInstruments.map(
      computeRegistryCollectionInstrument,
    ),
  }
}

/** Compute a registry release DTO from model data. */
export function computeRegistryReleaseDTO(
  release: RegistryRelease,
): RegistryReleaseDTO {
  return {
    ...release,
    releaseDate: new Date(release.releaseDate).toISOString(),
    collectionInstruments: release.collectionInstruments.map(
      computeRegistryCollectionInstrumentDTO,
    ),
  }
}

function computeRegistryCollectionInstrument(
  dto: RegistryCollectionInstrumentDTO,
): RegistryCollectionInstrument {
  return {
    ...dto,
    mode: computeTargetModes(dto.mode),
  }
}

function computeRegistryCollectionInstrumentDTO(
  instrument: RegistryCollectionInstrument,
): RegistryCollectionInstrumentDTO {
  return {
    ...instrument,
    mode: computeTargetModesDTO(instrument.mode),
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
    requestDate: new Date(dto.requestDate).getTime(),
    modes: dto.modes.map(computeTargetModes),
  }
}

/** Compute a release request DTO from model data. */
export function computeReleaseRequestDTO(
  request: ReleaseRequest,
): ReleaseRequestDTO {
  return {
    ...request,
    requestDate: new Date(request.requestDate).toISOString(),
    modes: request.modes.map(computeTargetModesDTO),
  }
}

/** Compute a create release DTO from form values. */
export function computeCreateReleaseDTO(
  questionnaireId: string,
  formValues: FormValues,
): CreateReleaseDTO {
  return {
    poguesId: questionnaireId,
    releaseDescription: formValues.releaseDescription,
    mode: formValues.mode[0],
    context: formValues.context,
    overrideGenerationParameters: {
      responseTimeQuestion:
        formValues.overrideGenerationParameters.responseTimeQuestion ?? true,
      questionNumberingMode:
        formValues.overrideGenerationParameters.questionNumberingMode ??
        'SEQUENCE',
    },
  }
}

function computeTargetModes(mode: TargetMode): TargetModes {
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

function computeTargetModesDTO(mode: TargetModes): TargetMode {
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
