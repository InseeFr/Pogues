import { useTranslation } from 'react-i18next'

import Button, { ButtonStyle } from '@/components/ui/Button'

export default function Login({ login }: { login: () => void }) {
  const { t } = useTranslation()

  return (
    <div className="text-center space-y-3">
      <h1 className="text-base font-normal">{t('common.pleaseLogin')}</h1>
      <Button onClick={login} buttonStyle={ButtonStyle.Primary}>
        {t('common.login')}
      </Button>
    </div>
  )
}
