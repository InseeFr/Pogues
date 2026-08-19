import { useTranslation } from 'react-i18next'

import ButtonLink from '../ui/ButtonLink'

export default function ContactUs() {
  const { t } = useTranslation()
  const conceptionMail = import.meta.env.VITE_CONTACT_MAIL_CONCEPTION as string
  const generalMail = import.meta.env.VITE_CONTACT_MAIL_GENERAL as string
  const faqLink = import.meta.env.VITE_FREQUENTLY_ASKED_QUESTIONS_URL as string

  return (
    <div className="flex items-center justify-center bg-main p-4">
      <div className="flex w-full max-w-5xl flex-col items-center gap-6 lg:flex-row">
        <div className="flex-1 space-y-8">
          <h1 className="text-3xl font-bold">{t('common.contactUs.title')}</h1>

          <div>
            <h2 className="text-lg font-semibold">
              {t('common.contactUs.contactConceptionTeam')}
            </h2>
            <p className="text-secondary text-sm">
              {t('common.contactUs.conceptionQuestion')}
            </p>
            <a
              href={`mailto:${conceptionMail}`}
              className="mt-1 block underline"
            >
              {conceptionMail}
            </a>
          </div>

          <div className="border-t border-gray-300 pt-8">
            <h2 className="text-lg font-semibold">
              {t('common.contactUs.contactGeneralTeam')}
            </h2>
            <p className="text-secondary text-sm">
              {t('common.contactUs.generalQuestion')}
            </p>
            <a href={`mailto:${generalMail}`} className="mt-1 block underline">
              {generalMail}
            </a>
          </div>

          <div className="border-t border-gray-300 pt-8">
            <h2 className="text-lg font-semibold">
              {t('common.contactUs.frequentlyAskedQuestions')}
            </h2>
            <a
              className="flex items-center gap-x-1 hover:underline"
              href={faqLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('common.contactUs.frequentlyAskedQuestionsLink')}
            </a>
          </div>

          <ButtonLink to="/">{t('error.backToHome')}</ButtonLink>
        </div>

        <div className="w-92 shrink-0 lg:block">
          <img src="/ContactPenguin.svg" alt="" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
