import { useTranslation } from 'react-i18next'

export default function WaitingComponent() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col justify-center items-center bg-main h-full">
      <h2 className="text-2xl font-bold animate-pulse">
        {t('common.loading')}
      </h2>
      <div className="lg:block w-72 shrink-0">
        <img
          src="/WaitingPenguin.png"
          alt="Waiting penguin"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
