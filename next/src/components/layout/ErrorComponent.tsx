import { isAxiosError } from 'axios'
import { type TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

import ButtonLink from '@/components/ui/ButtonLink'

type Props = {
  error: Error
  customMessage?: string
}

type ErrorInfo = {
  code?: number
  title: string
  subtitle: string
  paragraph: string
}

function getErrorInfo(error: Error, t: TFunction): ErrorInfo {
  if (isAxiosError(error)) {
    const status = error.response?.status
    switch (status) {
      case 404:
        return {
          title: t('error.resourceNotFound.title'),
          subtitle: t('error.resourceNotFound.subtitle'),
          paragraph: t('error.resourceNotFound.paragraph'),
          code: status,
        }
      case 401:
        return {
          title: t('error.unauthorized.title'),
          subtitle: t('error.unauthorized.subtitle'),
          paragraph: t('error.unauthorized.paragraph'),
          code: status,
        }
      case 403:
        return {
          title: t('error.forbidden.title'),
          subtitle: t('error.forbidden.subtitle'),
          paragraph: t('error.forbidden.paragraph'),
          code: status,
        }
      case 400:
        return {
          title: t('error.badRequest.title'),
          subtitle: t('error.badRequest.subtitle'),
          paragraph: t('error.badRequest.paragraph'),
          code: status,
        }
      case 500:
        return {
          title: t('error.serverError.title'),
          subtitle: t('error.serverError.subtitle'),
          paragraph: t('error.serverError.paragraph'),
          code: status,
        }
      default:
        return {
          title: t('error.unhandledError.title'),
          subtitle: t('error.unhandledError.subtitle'),
          paragraph: t('error.unhandledError.paragraph'),
          code: status,
        }
    }
  }
  return {
    title: t('error.serverError.title'),
    subtitle: t('error.serverError.subtitle'),
    paragraph: t('error.serverError.paragraph'),
    code: 500,
  }
}

export default function ErrorComponent({
  error,
  customMessage,
}: Readonly<Props>) {
  const { t } = useTranslation()
  const { code, title, subtitle, paragraph } = getErrorInfo(error, t)
  return (
    <div className="flex items-center justify-center p-4 bg-main">
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-4xl w-full">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          {customMessage ? (
            <p className="mt-6">{customMessage}</p>
          ) : (
            <>
              <span className="text-secondary text-sm">
                {t('error.code', { code })}
              </span>
              <p className="mt-6 text-lg font-semibold">{subtitle}</p>
              <p className="mt-6">{paragraph}</p>
            </>
          )}

          <div className="mt-8">
            <ButtonLink to="/">{t('error.backToHome')}</ButtonLink>
          </div>
        </div>
        <div className="lg:block w-72 shrink-0">
          <img src="/LostPenguin.svg" alt="" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
