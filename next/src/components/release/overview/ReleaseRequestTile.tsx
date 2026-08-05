import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

import { useState } from 'react'

import { getStatusDescriptionKey } from '@/api/utils/releases'
import ButtonIcon, { ButtonIconStyle } from '@/components/ui/ButtonIcon'
import ExpandButton from '@/components/ui/ExpandButton'
import Tooltip from '@/components/ui/Tooltip'
import DeleteIcon from '@/components/ui/icons/DeleteIcon'
import OpenInNewIcon from '@/components/ui/icons/OpenInNewIcon'
import { TargetModes } from '@/models/questionnaires'
import { computeDayFromDate, computeFullDateFromDate } from '@/utils/date'

import type { ReleaseRequest } from '../../../models/releases'
import { ReleaseOptionalParametersDisplay } from './ReleaseOptionalParametersDisplay'

function getStatusLabel(
  status: ReleaseRequest['status'],
  t: TFunction,
): string {
  switch (status) {
    case 'COMPLETED':
      return t('release.status.completed')
    case 'FAILED':
      return t('release.status.failed')
    default:
      return t('release.status.inProgress')
  }
}

function isFailedOrCompleted(status: ReleaseRequest['status']): boolean {
  return status === 'FAILED' || status === 'COMPLETED'
}

function getStatusDescription(statusDescription: string, t: TFunction): string {
  if (!statusDescription) {
    return ''
  }
  const key = getStatusDescriptionKey(statusDescription)
  return t(`release.statusDescription.${key}`, statusDescription)
}

export function ReleaseRequestTile({
  request,
  onDelete,
}: Readonly<{
  request: ReleaseRequest
  onDelete: (releaseRequestId: number) => void
}>) {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const contentId = `request-content-${request.releaseRequestId}`
  const trombiUrl = import.meta.env.VITE_TROMBI_URL
  const requestDate = new Date(request.requestDate)

  const statusBadge = (
    <div
      className={`inline-flex items-center gap-1 px-3 py-1 rounded text-sm font-medium ${
        request.status === 'FAILED'
          ? 'bg-red-50 text-red-600'
          : request.status === 'COMPLETED'
            ? 'bg-green-50 text-green-600'
            : 'bg-gray-100 text-gray-500'
      }`}
    >
      {getStatusLabel(request.status, t)}
    </div>
  )

  return (
    <div className="bg-default odd:bg-main p-4 border-b border-default last:border-b-0">
      <button
        type="button"
        className="flex items-center justify-between w-full cursor-pointer bg-transparent border-none p-0 text-left"
        onClick={() => setIsExpanded((v) => !v)}
        aria-expanded={isExpanded}
        aria-controls={contentId}
      >
        <div className="font-semibold">{request.releaseDescription}</div>
        <div className="flex flex-row items-end gap-2">
          {request.status === 'FAILED' && request.statusDescription ? (
            <Tooltip title={getStatusDescription(request.statusDescription, t)}>
              {statusBadge}
            </Tooltip>
          ) : (
            statusBadge
          )}

          <ExpandButton
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            ariaControls={contentId}
          />
        </div>
      </button>
      {isExpanded && (
        <div id={contentId} className="grid grid-cols-[1fr_auto] gap-4 mt-4">
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-x-6 gap-y-1 text-sm">
              <div>
                <b className="text-gray-500 font-normal">
                  {t('release.collectMode')} :{' '}
                </b>
                {request.modes.map((mode) => TargetModes[mode]).join(', ')}
              </div>
              <div />
              <div />

              <div className="row-span-3 space-y-1 mb-2">
                <ReleaseOptionalParametersDisplay
                  overrideGenerationParameters={
                    request.overrideGenerationParameters
                  }
                  innerClassName="border-l-2 border-gray-300 pl-3 mr-2 space-y-1"
                />
              </div>

              <div>
                <b className="text-gray-500 font-normal">
                  {t('release.contexte')} :{' '}
                </b>
                {request.context}
              </div>
              <div />
              <div />

              <div>
                <b className="text-gray-500 font-normal">
                  {t('release.author')} :{' '}
                </b>
                <a
                  href={`${trombiUrl}/${request.author}`}
                  target="_blank"
                  className="text-action-primary fill-action-primary inline-flex items-center gap-1 hover:underline"
                >
                  {request.author}
                  <OpenInNewIcon height="14" width="14" />
                </a>
              </div>
              <div>
                <b className="text-gray-500 font-normal">
                  {t('release.demandDate')} :{' '}
                </b>
                <time
                  dateTime={requestDate.toISOString()}
                  title={computeFullDateFromDate(requestDate)}
                >
                  {computeDayFromDate(requestDate)}
                </time>
              </div>
              <div />
            </div>
            {request.status === 'FAILED' && request.statusDescription && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-2 mt-2">
                {getStatusDescription(request.statusDescription, t)}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            {isFailedOrCompleted(request.status) && (
              <ButtonIcon
                className="col-start-4 h-12"
                Icon={DeleteIcon}
                title={t('release.deleteRequest')}
                onClick={() => onDelete(request.releaseRequestId)}
                buttonStyle={ButtonIconStyle.Delete}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
