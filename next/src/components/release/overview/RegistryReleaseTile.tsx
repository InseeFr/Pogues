import { useTranslation } from 'react-i18next'

import { computeDayFromDate, computeFullDateFromDate } from '@/utils/date'

import type { RegistryRelease } from '../../../models/releases'
import OpenInNewIcon from '../../ui/icons/OpenInNewIcon'
import VisualizeIcon from '../../ui/icons/VisualizeIcon'
import { CopyButton } from './CopyButton'
import { ReleaseOptionalParametersDisplay } from './ReleaseOptionalParametersDisplay'

export function RegistryReleaseTile({
  release,
}: Readonly<{
  release: RegistryRelease
}>) {
  const { t } = useTranslation()
  const trombiUrl = import.meta.env.VITE_TROMBI_URL
  const releaseDate = new Date(release.releaseDate)

  return (
    <div className="bg-default odd:bg-main p-4 border-b border-default last:border-b-0">
      <div className="space-y-2">
        <div className="font-semibold flex flex-row gap-x-1">
          {release.releaseDescription}
          <a
            href={release.visualizeUrl}
            target="_blank"
            className="text-action-primary fill-action-primary inline-flex items-center gap-1 hover:underline"
          >
            <VisualizeIcon height="16" width="16" />
          </a>
        </div>

        <div className="grid grid-cols-[1.6fr_0.7fr_1fr_1fr] gap-x-6 gap-y-1 text-sm">
          <div>
            <b className="text-gray-500 font-normal">
              {t('release.instrumentCollecte')} :{' '}
            </b>
            {release.collectionInstrumentId}{' '}
            <CopyButton text={release.collectionInstrumentId} />
          </div>
          <div>
            <b className="text-gray-500 font-normal">
              {t('release.version')} :{' '}
            </b>
            {release.version}
          </div>
          <div />

          <div className="row-span-3 space-y-1 mb-2">
            {release.context === 'BUSINESS' &&
              release.overrideGenerationParameters && (
                <div className="space-y-1 mb-2">
                  <ReleaseOptionalParametersDisplay
                    overrideGenerationParameters={
                      release.overrideGenerationParameters
                    }
                    innerClassName="ml-4 space-y-1"
                  />
                </div>
              )}
          </div>

          <div>
            <b className="text-gray-500 font-normal">
              {t('release.collectMode')} :{' '}
            </b>
            {release.mode}
          </div>
          <div>
            <b className="text-gray-500 font-normal">
              {t('release.contexte')} :{' '}
            </b>
            {release.context}
          </div>
          <div />

          <div>
            <b className="text-gray-500 font-normal">
              {t('release.sauvegardePogues')} :{' '}
            </b>
            <a
              href={release.visualizeUrl}
              target="_blank"
              className="text-action-primary fill-action-primary inline-flex items-center gap-1 hover:underline"
            >
              {release.poguesVersionId}
              <OpenInNewIcon height="14" width="14" />
            </a>
          </div>
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
        </div>
      </div>
    </div>
  )
}
