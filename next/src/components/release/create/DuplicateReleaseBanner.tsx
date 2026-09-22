import { useTranslation } from 'react-i18next'

import WarningIcon from '@/components/ui/icons/WarningIcon'

export default function DuplicateReleaseBanner() {
  const { t } = useTranslation()

  return (
    <div
      role="alert"
      className="bg-orange-100 border border-orange-300 text-orange-800 text-sm rounded p-3 mb-6 flex items-center gap-1"
    >
      <WarningIcon className="w-6 h-6 text-orange-800 mr-3 shrink-0" />
      {t('release.create.alreadyPublished')}
    </div>
  )
}
