import { createFileRoute, redirect } from '@tanstack/react-router';
import { Trans, useTranslation } from 'react-i18next';

import Button from '@/components/ui/Button';
import ButtonLink, { ButtonType } from '@/components/ui/ButtonLink';

import poguesLogo from '/pogues-logo.png';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: '/questionnaires',
    });
  },
  component: App,
});

function App() {
  const { t } = useTranslation();
  return (
    <div className="p-4 space-y-10 gradient min-h-screen bg-default">
      <div className="p-4 space-y-2 my-12">
        <h2>
          <img src={poguesLogo} className="m-auto" alt="Pogues" />
        </h2>
        <div className="text-center text-lg">{t('home.label')}</div>
      </div>
      <div className="text-center m-auto grid grid-cols-2 gap-x-6 max-w-xs">
        <ButtonLink to="/questionnaires" buttonType={ButtonType.Primary}>
          {t('common.start')}
        </ButtonLink>
        <a href="https://inseefr.github.io/Bowie/1._Pogues/" target="_blank">
          <Button>{t('common.documentation')}</Button>
        </a>
      </div>
      <div className="space-y-8 px-12">
        <div className="text-3xl font-bold">
          <Trans i18nKey="home.transformVariables" />
        </div>
        <div className="space-y-2">
          <p>
            <Trans i18nKey="home.poguesIntro" />
          </p>
          <p>
            <Trans i18nKey="home.interfaceDescription" />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 w-3/4 m-auto">
        <div className="bg-default p-4 border border-default shadow-xl space-y-3 grid grid-rows-[1fr_auto_auto] overflow-hidden">
          <h3>{t('common.documentation')}</h3>
          <div>{t('home.docsLabel')}</div>
          <div>
            <a
              href="https://inseefr.github.io/Bowie/1._Pogues/"
              className="text-primary underline"
              target="_blank"
            >
              {t('home.docsLink')}
            </a>
          </div>
        </div>
        <div className="bg-default p-4 border border-default shadow-xl space-y-3 grid grid-rows-[1fr_auto_auto] overflow-hidden">
          <h3>{t('external.publicEnemy')}</h3>
          <div>{t('external.publicEnemyLabel')}</div>
          <div>
            <a
              href="https://personnalisation-conception-questionnaires.developpement.insee.fr/questionnaires"
              className="text-primary underline"
              target="_blank"
            >
              {t('external.publicEnemy')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
