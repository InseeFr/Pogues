import { useTranslation } from 'react-i18next'

export default function DefaultPendingComponent() {
  const { t } = useTranslation()
  return <>{t('common.loading')}</>
}
