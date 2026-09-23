import { useTranslation } from 'react-i18next'

import ErrorIcon from '@/components/ui/icons/ErrorIcon'

export default function DuplicateReleaseBanner() {
  const { t } = useTranslation()

  return (
    <div
      role="alert"
      className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-3 mb-6 flex items-center gap-2"
    >
      <ErrorIcon height="16px" width="16px" aria-hidden="true" />
      {t('release.create.alreadyPublished')}
    </div>
  )
}
