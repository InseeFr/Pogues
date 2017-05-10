import React from 'react';

import Logger from 'utils/logger/logger';
import QuestionnaireListContainer from 'containers/questionnaire/questionnaire-list';

const logger = new Logger('PageHome', 'Components');

function PageHome() {
  logger.debug('Rendering HomePage component');

  return (
    <div id="page-home">
      <h1>Bienvenue dans POGUES</h1>

      <div className="box home-questionnaires">
        <h3>Questionnaires en cours de conception par votre équipe</h3>
        <h4>Timbre : F302</h4>
        <QuestionnaireListContainer />
      </div>
      <div className="home-sidebar">
        <div className="box">
          <h3>Créer un questionnaire</h3>
          <ul className="menu-navigation">
            <li>
              <button id="questionnaire-new" className="btn-yellow">
                <strong>Questionnaire vide</strong>
              </button>
            </li>
          </ul>
        </div>
        <ul className="menu-navigation">
          <li>
            <button id="questionnaires-search" className="btn-search">
              Rechercher un questionnaire
            </button>
          </li>

          <li>
            <button id="questionnaires-team" className="btn-blue">
              <strong>De mon équipe</strong><br />
              En cours et publiés
            </button>
          </li>
          <li>
            <button id="questionnaires-insee" className="btn-blue">
              <strong>Du référentiel</strong><br />
              Publiés par l'Insee
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PageHome;
