import { createFileRoute, redirect } from '@tanstack/react-router';

import Button from '@/components/ui/Button';
import ButtonLink, { ButtonType } from '@/components/ui/ButtonLink';

import { useTranslation } from '../i18n';
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
  return (
    <div className="p-4 space-y-10 gradient min-h-screen bg-default">
      <div className="p-4 space-y-2 my-12">
        <h2>
          <img src={poguesLogo} className="m-auto" alt="Pogues" />
        </h2>
        <div className="text-center text-lg">{tHome('label')}</div>
      </div>
      <div className="text-center m-auto grid grid-cols-2 gap-x-6 max-w-xs">
        <ButtonLink to="/questionnaires" buttonType={ButtonType.Primary}>
          {tCommon('start')}
        </ButtonLink>
        <a href="https://inseefr.github.io/Bowie/1._Pogues/" target="_blank">
          <Button>{tCommon('documentation')}</Button>
        </a>
      </div>
      <div className="space-y-8 px-12">
        <div className="text-3xl font-bold">{tHome('transformVariables')}</div>
        <div className="space-y-2">
          <p>{tHome('poguesIntro')}</p>
          <p>{tHome('interfaceDescription')}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 w-3/4 m-auto">
        <div className="bg-default p-4 border border-default shadow-xl space-y-3 grid grid-rows-[1fr_auto_auto] overflow-hidden">
          <h3>{tCommon('documentation')}</h3>
          <div>{tHome('docsLabel')}</div>
          <div>
            <a
              href="https://inseefr.github.io/Bowie/1._Pogues/"
              className="text-primary underline"
              target="_blank"
            >
              {tHome('docsLink')}
            </a>
          </div>
        </div>
        <div className="bg-default p-4 border border-default shadow-xl space-y-3 grid grid-rows-[1fr_auto_auto] overflow-hidden">
          <h3>{tExternal('publicEnemy')}</h3>
          <div>{tExternal('publicEnemyLabel')}</div>
          <div>
            <a
              href="https://personnalisation-conception-questionnaires.developpement.insee.fr/questionnaires"
              className="text-primary underline"
              target="_blank"
            >
              {tExternal('publicEnemy')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
