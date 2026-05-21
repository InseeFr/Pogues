import { isAxiosError } from 'axios'
import { type TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

import ButtonLink from '../ui/ButtonLink'

type ErrorInfo = {
  code?: number
  title: string
  subtitle: string
  paragraph: string
}

function getErrorInfo(error: Error, t: TFunction): ErrorInfo {
  if (isAxiosError(error)) {
    const status = error.response?.status
    if (status === 403) {
      return {
        code: 403,
        title: t('error.403.title'),
        subtitle: t('error.403.subtitle'),
        paragraph: t('error.403.paragraph'),
      }
    }
    if (status === 404) {
      return {
        code: 404,
        title: t('error.404.title'),
        subtitle: t('error.404.subtitle'),
        paragraph: t('error.404.paragraph'),
      }
    }
  }
  return {
    code: 500,
    title: t('error.500.title'),
    subtitle: t('error.500.subtitle'),
    paragraph: t('error.500.paragraph'),
  }
}

export default function Error({ error }: Readonly<{ error: Error }>) {
  const { t } = useTranslation()
  const { code, title, subtitle, paragraph } = getErrorInfo(error, t)

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-main">
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-4xl w-full">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          {code && (
            <span className="text-secondary text-sm">
              {t('error.code', { code })}
            </span>
          )}
          <p className="mt-6 text-lg font-semibold">{subtitle}</p>
          <p className="mt-6">{paragraph}</p>
          <div className="mt-8">
            <ButtonLink to="/">{t('error.backToHome')}</ButtonLink>
          </div>
        </div>
        <div className="hidden lg:block w-48 shrink-0">
          <img src="/LostPenguin.svg" alt="" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
