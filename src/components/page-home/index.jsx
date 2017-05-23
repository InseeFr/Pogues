import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logger from 'utils/logger/logger';
import QuestionnaireListContainer from 'containers/questionnaire/questionnaire-list';
import QuestionnaireNewContainer from 'containers/questionnaire/questionnaire-new';

const logger = new Logger('PageHome', 'Components');

const mapStateToProps = state => ({
  locale: state.locale,
});

export class PageHome extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    locale: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
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
    this.props.history.push(`/questionnaire/${questionnaireId}`);
  }

  render() {
    const { locale } = this.props;
    console.log(locale.newEmptyQuestionnaire);
    return (
      <div id="page-home">
        <h1>{locale.welcome}</h1>
        <div className="box home-questionnaires">
          <h3>{locale.homeQuestionnairesInProgress}</h3>
          {/* Mock stamp */}
          <h4>{locale.stamp} : F302</h4>
          <QuestionnaireListContainer />
        </div>
        <div className="home-sidebar">
          <div className="box">
            <h3>{locale.createQuestionnaire}</h3>
            <ul className="menu-navigation">
              <li>
                <button id="questionnaire-new" className="btn-yellow" onClick={this.handleOpenModal}>
                  <strong>{locale.emptyQuestionnaire}</strong>
                </button>
              </li>
            </ul>
          </div>
          <ul className="menu-navigation">
            <li>
              <button id="questionnaires-search" className="btn-search">
                {locale.searchQuestionnaire}
              </button>
            </li>

            <li>
              <button id="questionnaires-team" className="btn-blue">
                <strong>{locale.fromMyTeam}</strong><br />
                {locale.inProgressAndPublished}
              </button>
            </li>
            <li>
              <button id="questionnaires-insee" className="btn-blue">
                <strong>{locale.fromRepository}</strong><br />
                {locale.publishedByInsee}
              </button>
            </li>
          </ul>
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          contentLabel={locale.newEmptyQuestionnaire}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>{locale.newEmptyQuestionnaire}</h3>
              <button onClick={this.handleCloseModal}><span>X</span></button>
            </div>
            <div className="popup-body">
              <QuestionnaireNewContainer onCancel={this.handleCloseModal} onSuccess={this.handleQuestionnnarieCreated} />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PageHome);
