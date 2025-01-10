import { createRoute } from '@tanstack/react-router';

import '../App.css';
import { RouteRoot } from './root';
import poguesLogo from '/pogues-logo.png';

export const RouteIndex = createRoute({
  getParentRoute: () => RouteRoot,
  path: '/',
  component: App,
});

function App() {
  return (
    <div id="latest-pogues">
      <a href="https://inseefr.github.io/Bowie/1._Pogues/" target="_blank">
        <img src={poguesLogo} className="logo" alt="Pogues logo" />
      </a>
      <h1>Bienvenue sur la nouvelle interface de Pogues !</h1>
    </div>
  );
}
