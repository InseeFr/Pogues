import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Logger from 'utils/logger/logger';
import QuestionnaireNewContainer from 'home/containers/questionnaire-new';
import QuestionnaireListContainer from 'home/containers/questionnaire-list';
import Dictionary from 'utils/dictionary/dictionary';

const logger = new Logger('PageHome', 'Components');

export class PageHome extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleQuestionnaryCreated = this.handleQuestionnaryCreated.bind(this);
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

  handleQuestionnaryCreated(questionnaireId) {
    this.props.router.push(`/questionnaire/${questionnaireId}`);
  }

  render() {
    return (
      <div id="page-home">
        <h1>
          {Dictionary.welcome}
        </h1>
        <QuestionnaireListContainer />
        <div className="home-sidebar">
          <div className="box">
            <h3>
              {Dictionary.createQuestionnaire}
            </h3>
            <ul className="menu-navigation">
              <li>
                <button id="questionnaire-new" className="btn-yellow" onClick={this.handleOpenModal}>
                  <strong>
                    {Dictionary.newEmptyQuestionnaire}
                  </strong>
                </button>
              </li>
            </ul>
          </div>
          <ul className="menu-navigation">
            <li>
              <button id="questionnaires-search" className="btn-search">
                {Dictionary.searchQuestionnaire}
              </button>
            </li>

            <li>
              <Link to="/search/questionnaires" id="questionnaires-insee" className="btn-blue">
                <span className="glyphicon glyphicon-chevron-right" />
                <strong>
                  {Dictionary.fromRepository}
                </strong>
                <br />
                {Dictionary.publishedByInsee}
              </Link>
            </li>
          </ul>
        </div>
        <ReactModal
          shouldCloseOnOverlayClick={false}
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          contentLabel={Dictionary.newEmptyQuestionnaire}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>
                {Dictionary.newEmptyQuestionnaire}
              </h3>
              <button type="button" onClick={this.handleCloseModal}>
                <span>X</span>
              </button>
            </div>
            <div className="popup-body">
              <QuestionnaireNewContainer onCancel={this.handleCloseModal} onSuccess={this.handleQuestionnaryCreated} />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default PageHome;
