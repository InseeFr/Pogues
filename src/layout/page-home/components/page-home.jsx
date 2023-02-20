import React, { useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { QuestionnaireNew } from 'layout/questionnaire-new';
import { QuestionnaireList } from 'layout/questionnaire-list';

import Dictionary from 'utils/dictionary/dictionary';

const PageHome = ({ history, deleteAppState }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => deleteAppState(), [deleteAppState]);

  const handleOpenModal = useCallback(() => setShowModal(true), []);
  const handleCloseModal = useCallback(() => setShowModal(false), []);

  const handleQuestionnaryCreated = useCallback(
    questionnaireId => history.push(`/questionnaire/${questionnaireId}`),
    [history],
  );

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

PageHome.propTypes = {
  history: PropTypes.object.isRequired,
  deleteAppState: PropTypes.func.isRequired,
};

export default PageHome;
