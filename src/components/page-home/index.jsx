import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logger from 'utils/logger/logger';
import QuestionnaireListContainer from 'containers/questionnaire/questionnaire-list';
import QuestionnaireNew from 'containers/questionnaire/questionnaire-new';

const logger = new Logger('PageHome', 'Components');

const mapStateToProps = state => ({
  locale: state.locale,
});

class PageHome extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    locale: PropTypes.object.isRequired,
  };

  constructor({ history, locale }) {
    super();
    this.state = {
      showModal: false,
    };

    this.history = history;
    this.locale = locale;
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
        <h1>{this.locale.welcome}</h1>
        <div className="box home-questionnaires">
          <h3>{this.locale.homeQuestionnairesInProgress}</h3>
          {/* Mock stamp */}
          <h4>{this.locale.stamp} : F302</h4>
          <QuestionnaireListContainer />
        </div>
        <div className="home-sidebar">
          <div className="box">
            <h3>{this.locale.createQuestionnaire}</h3>
            <ul className="menu-navigation">
              <li>
                <button id="questionnaire-new" className="btn-yellow" onClick={this.handleOpenModal}>
                  <strong>{this.locale.emptyQuestionnaire}</strong>
                </button>
              </li>
            </ul>
          </div>
          <ul className="menu-navigation">
            <li>
              <button id="questionnaires-search" className="btn-search">
                {this.locale.searchQuestionnaire}
              </button>
            </li>

            <li>
              <button id="questionnaires-team" className="btn-blue">
                <strong>{this.locale.fromMyTeam}</strong><br />
                {this.locale.inProgressAndPublished}
              </button>
            </li>
            <li>
              <button id="questionnaires-insee" className="btn-blue">
                <strong>{this.locale.fromRepository}</strong><br />
                {this.locale.publishedByInsee}
              </button>
            </li>
          </ul>
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          contentLabel={this.locale.newEmptyQuestionnaire}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>{this.locale.newEmptyQuestionnaire}</h3>
              <button onClick={this.handleCloseModal}><span>X</span></button>
            </div>
            <div className="popup-body">
              <QuestionnaireNew onCancel={this.handleCloseModal} onSuccess={this.handleQuestionnnarieCreated}
              />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PageHome);
