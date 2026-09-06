import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { useId, useState } from 'react'

import { getContextLabel } from '@/api/utils/releases'
import { versionQueryOptions } from '@/api/versions'
import Button, { ButtonStyle } from '@/components/ui/Button'
import ExpandButton from '@/components/ui/ExpandButton'
import Tooltip from '@/components/ui/Tooltip'
import { TargetModes } from '@/models/questionnaires'
import { computeDayFromDate, computeFullDateFromDate } from '@/utils/date'

import type {
  RegistryCollectionInstrument,
  RegistryRelease,
} from '../../../models/releases'
import OpenInNewIcon from '../../ui/icons/OpenInNewIcon'
import { CopyButton } from './CopyButton'
import { ReleaseOptionalParametersDisplay } from './ReleaseOptionalParametersDisplay'

function RegistryCollectionInstrumentCard({
  instrument,
}: Readonly<{
  instrument: RegistryCollectionInstrument
}>) {
  const { t } = useTranslation()
  const expandDetailsId = useId()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleNavigateVisualize = (visualizeUrl: string) => {
    window.open(visualizeUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="border border-default rounded">
      <div className="flex flex-row items-center justify-between">
        <button
          type="button"
          className="flex-1 cursor-pointer bg-transparent border-none px-3 py-2 text-left font-medium"
          onClick={() => setIsExpanded((v) => !v)}
          aria-expanded={isExpanded}
          aria-controls={expandDetailsId}
        >
          {TargetModes[instrument.mode]}
        </button>
        <div className="pr-2 -mt-2">
          <ExpandButton
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            ariaControls={expandDetailsId}
          />
        </div>
      </div>
      {isExpanded && (
        <div
          id={expandDetailsId}
          className="border-t border-default px-3 py-2 space-y-2 text-sm"
        >
          <div className="flex flex-row flex-wrap items-center space-around gap-x-6 gap-y-1">
            <div>
              <b className="text-gray-500 font-normal">
                {t('release.collectInstrument')} :{' '}
              </b>
              {instrument.collectionInstrumentId}{' '}
              <CopyButton text={instrument.collectionInstrumentId} />
            </div>
            <div>
              <b className="text-gray-500 font-normal">
                {t('release.version')} :{' '}
              </b>
              {instrument.version}
            </div>
            <Button
              type="button"
              onClick={() => handleNavigateVisualize(instrument.visualizeUrl)}
              buttonStyle={ButtonStyle.Primary}
              className="ml-auto"
            >
              {t('release.vizualiseLink')}
            </Button>
          </div>
          {instrument.overrideGenerationParameters && (
            <ReleaseOptionalParametersDisplay
              overrideGenerationParameters={
                instrument.overrideGenerationParameters
              }
              innerClassName="ml-4 space-y-1"
            />
          )}
        </div>
      )}
    </div>
  )
}

export function RegistryReleaseTile({
  release,
}: Readonly<{
  release: RegistryRelease
}>) {
  const { t } = useTranslation()
  const trombiUrl = import.meta.env.VITE_TROMBI_URL
  const releaseDate = new Date(release.releaseDate)
  const { data: version } = useQuery(
    versionQueryOptions(release.poguesVersionId),
  )

  return (
    <div className="bg-default odd:bg-main p-4 border-b border-default last:border-b-0">
      <div className="space-y-2">
        <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-1">
          <div className="font-semibold">{release.releaseDescription}</div>

          <div className="text-sm flex flex-row flex-wrap gap-x-6 gap-y-1">
            <div>
              <b className="text-gray-500 font-normal">
                {t('release.author')} :{' '}
              </b>
              <a
                href={`${trombiUrl}/${release.author}`}
                target="_blank"
                className="text-action-primary fill-action-primary inline-flex items-center gap-1 hover:underline"
              >
                {release.author}
                <OpenInNewIcon height="14" width="14" />
              </a>
            </div>
            <div>
              <b className="text-gray-500 font-normal">
                {t('release.publicationDate')} :{' '}
              </b>
              <time
                dateTime={releaseDate.toISOString()}
                title={computeFullDateFromDate(releaseDate)}
              >
                {computeDayFromDate(releaseDate)}{' '}
              </time>
            </div>
            <div>
              <b className="text-gray-500 font-normal">
                {t('release.contexte')} :{' '}
              </b>
              {getContextLabel(release.context, t)}
            </div>
          </div>
        </div>

        <div className="text-sm">
          <b className="text-gray-500 font-normal">
            {t('release.poguesSave')} :{' '}
          </b>
          <Tooltip title={version?.day}>
            <span>{release.poguesVersionId}</span>
          </Tooltip>
        </div>

        <div className="space-y-2">
          {release.collectionInstruments.map((instrument) => (
            <RegistryCollectionInstrumentCard
              key={TargetModes[instrument.mode]}
              instrument={instrument}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
