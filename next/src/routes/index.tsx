import { createFileRoute, redirect } from '@tanstack/react-router';

import Button from '@/components/ui/Button';
import ButtonLink, { ButtonType } from '@/components/ui/ButtonLink';
import { useOidc } from '@/contexts/oidc';

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
  const oidc = useOidc();
  const { isUserLoggedIn, login } = oidc;
  if (!isUserLoggedIn) {
    login({
      doesCurrentHrefRequiresAuth: true,
    });
    return <div>Please login</div>;
  }

  return (
    <div className="p-4 space-y-10 gradient min-h-screen bg-default">
      <div className="p-4 space-y-2 my-12">
        <h2>
          <img src={poguesLogo} className="m-auto" alt="Pogues" />
        </h2>
        <div className="text-center text-lg">
          Outil de conception de questionnaire.
        </div>
      </div>
      <div className="text-center m-auto grid grid-cols-2 gap-x-6 max-w-xs">
        <ButtonLink to="/questionnaires" buttonType={ButtonType.Primary}>
          Commencer
        </ButtonLink>
        <a href="https://inseefr.github.io/Bowie/1._Pogues/" target="_blank">
          <Button>Documentation</Button>
        </a>
      </div>
      <div className="space-y-8 px-12">
        <div className="text-3xl font-bold">
          Transformez vos variables en{' '}
          <span className="text-orange-400">questionnaires</span>.
        </div>
        <div className="space-y-2">
          <p>
            Pogues est aujourd'hui le point d'entrée principal dans les services
            fournis par <span className="font-bold">Bowie</span>.
          </p>
          <p>
            C'est une interface graphique de conception de questionnaires
            permettant la création des{' '}
            <span className="font-bold">éléments structurels</span> (séquences,
            questions) et des{' '}
            <span className="font-bold">éléments dynamiques</span> (filtres,
            contrôles, boucles).
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 w-3/4 m-auto">
        <div className="bg-default p-4 border border-default shadow-xl space-y-3 grid grid-rows-[1fr_auto_auto] overflow-hidden">
          <h3>Documentation</h3>
          <div>La réponse à toutes vos questions.</div>
          <div>
            <a
              href="https://inseefr.github.io/Bowie/1._Pogues/"
              className="text-primary underline"
              target="_blank"
            >
              Accéder à la documentation
            </a>
          </div>
        </div>
        <div className="bg-default p-4 border border-default shadow-xl space-y-3 grid grid-rows-[1fr_auto_auto] overflow-hidden">
          <h3>Public Enemy</h3>
          <div>Personnaliser son questionnaire.</div>
          <div>
            <a
              href="https://personnalisation-conception-questionnaires.developpement.insee.fr/questionnaires"
              className="text-primary underline"
              target="_blank"
            >
              Public Enemy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
