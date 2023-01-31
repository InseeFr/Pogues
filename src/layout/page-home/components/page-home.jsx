import React, { useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { QuestionnaireNew } from 'layout/questionnaire-new';
import { QuestionnaireList } from 'layout/questionnaire-list';

import Dictionary from 'utils/dictionary/dictionary';

const PageHome = ({ history, deleteAppState, stamp }) => {
  const [showModal, setShowModal] = useState(false);
  const [isNewQuestionnaireTcm, setIsNewQuestionnaireTcm] = useState(false);

  useEffect(() => deleteAppState(), [deleteAppState]);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
    setIsNewQuestionnaireTcm(false);
  }, []);
  const handleOpenTcmModal = useCallback(() => {
    setShowModal(true);
    setIsNewQuestionnaireTcm(true);
  }, []);
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
            {stamp === 'FAKEPERMISSION' && (
              <li>
                <button
                  id="tcm-new"
                  className="btn-yellow"
                  onClick={handleOpenTcmModal}
                >
                  <strong>{Dictionary.newEmptyTcm}</strong>
                </button>
              </li>
            )}
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
              isTcm={isNewQuestionnaireTcm}
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
  stamp: PropTypes.string,
};

export default PageHome;
