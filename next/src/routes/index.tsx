import { createFileRoute } from '@tanstack/react-router';

import { useOidc } from '@/contexts/oidc';

import poguesLogo from '/pogues-logo.png';

export const Route = createFileRoute('/')({
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
    <div id="latest-pogues">
      <img src={poguesLogo} className="logo" alt="Pogues" />
      <h2>Bienvenue sur la nouvelle interface de Pogues !</h2>
    </div>
  );
}
