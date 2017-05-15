import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import Logger from 'utils/logger/logger';
import QuestionnaireListContainer from 'containers/questionnaire/questionnaire-list';
import QuestionnaireNew from 'containers/questionnaire/questionnaire-new';

const logger = new Logger('PageHome', 'Components');

class PageHome extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  constructor({ history }) {
    super();
    this.state = {
      showModal: false,
    };

    this.history = history;
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleQuestionnnarieCreated = this.handleQuestionnnarieCreated.bind(this);
  }

  componentDidMount() {
    logger.debug('Rendering HomePage component');
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleQuestionnnarieCreated(questionnaireId) {
    this.history.push(`/questionnaire/${questionnaireId}`);
  }

  render() {
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
                <button id="questionnaire-new" className="btn-yellow" onClick={this.handleOpenModal}>
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
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          contentLabel="Créer un questionnaire vide"
        >
          <div className="popup">
            <div className="popup-header">
              <h3>Créer un questionnaire vide</h3>
              <button onClick={this.handleCloseModal}><span>X</span></button>
            </div>
            <div className="popup-body">
              <QuestionnaireNew onCancel={this.handleCloseModal} onSuccess={this.handleQuestionnnarieCreated} />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default PageHome;
