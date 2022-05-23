import React, { useState } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { QuestionnaireNew } from 'layout/questionnaire-new';
import { QuestionnaireList } from 'layout/questionnaire-list';

import Dictionary from 'utils/dictionary/dictionary';

// Prop types and default props

export const propTypes = {
  history: PropTypes.object.isRequired,
};

// Component

const PageHome = props => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleQuestionnaryCreated = questionnaireId => {
    props.history.push(`/questionnaire/${questionnaireId}`);
  };

  return (
    <div id="page-home">
      <h1>{Dictionary.welcome}</h1>

      {/* List of questionnaires */}

      <QuestionnaireList />

      {/* Sidebar */}

      <div className="home-sidebar">
        <div className="box">
          <h3>{Dictionary.createQuestionnaire}</h3>
          <ul className="menu-navigation">
            <li>
              <button
                id="questionnaire-new"
                className="btn-yellow"
                onClick={handleOpenModal}
              >
                <strong>{Dictionary.newEmptyQuestionnaire}</strong>
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
            <Link
              to="/search/questionnaires"
              id="questionnaires-insee"
              className="btn-blue"
            >
              <span className="glyphicon glyphicon-chevron-right" />
              <strong>{Dictionary.fromRepository}</strong>
              <br />
              {Dictionary.publishedByInsee}
            </Link>
          </li>
        </ul>
      </div>

      {/* Create questionnaire modal */}

      <ReactModal
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel={Dictionary.newEmptyQuestionnaire}
      >
        <div className="popup">
          <div className="popup-header">
            <h3>{Dictionary.newEmptyQuestionnaire}</h3>
            <button type="button" onClick={handleCloseModal}>
              <span>X</span>
            </button>
          </div>
          <div className="popup-body">
            <QuestionnaireNew
              onCancel={handleCloseModal}
              onSuccess={handleQuestionnaryCreated}
            />
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default PageHome;
