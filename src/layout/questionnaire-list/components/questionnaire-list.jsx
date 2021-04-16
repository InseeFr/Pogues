import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Questionnaire from './questionnaire';
import isEqual from 'lodash.isequal';

import Dictionary from 'utils/dictionary/dictionary';
import { formatDate, getState } from 'utils/component/component-utils';

const QuestionnaireList = props => {
  const {
    questionnaires,
    stamp,
    duplicateQuestionnaire,
    fusion,
    handleCloseNewQuestion,
    mergeQuestions,
    currentQuestion,
  } = props;
  const [filter, setFilter] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [questionLabel, setQuestionLabel] = useState('');
  const [checkedQuestion, setCheckedQuestion] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [questionList, seQuestionList] = useState([]);

  const handelCheck = id => {
    setCheckedQuestion(id);
  };
  const fusionateQuestion = () => {
    mergeQuestions(checkedQuestion);
    handleCloseNewQuestion();
  };
  useEffect(() => {
    if (!isEqual(questionnaires, questionList)) {
      props.loadQuestionnaireList(stamp);
      seQuestionList(questionnaires);
    }
  }, [stamp, questionnaires]);

  useEffect(() => {
    props.loadQuestionnaireList(stamp);
  }, [stamp]);

  const updateFilter = value => {
    setFilter(value);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleOpenPopup = (id, label) => {
    setShowPopup(true);
    setQuestionId(id);
    setQuestionLabel(label);
  };
  const handleSubmit = () => {
    duplicateQuestionnaire(questionId);
    props.loadQuestionnaireList(props.stamp);
    setShowPopup(false);
  };

  const list = questionnaires
    .filter(q => {
      return (
        currentQuestion !== q.id &&
        (filter === '' ||
          (q.label && q.label.toLowerCase().indexOf(filter) >= 0) ||
          getState(q.final).toLowerCase().indexOf(filter) >= 0 ||
          (q.lastUpdatedDate &&
            formatDate(q.lastUpdatedDate).toLowerCase().indexOf(filter) >= 0) ||
          !q)
      );
    })
    .sort((a, b) => {
      return (
        new Date(b.lastUpdatedDate).getTime() -
        new Date(a.lastUpdatedDate).getTime()
      );
    })
    .map(q => {
      if (q) {
        return (
          <Questionnaire
            key={q.id}
            id={q.id}
            label={q.label}
            lastUpdatedDate={q.lastUpdatedDate}
            final={q.final}
            handleOpenPopup={(id, label) => handleOpenPopup(id, label)}
            fusion={!!fusion}
            handelCheck={handelCheck}
            fusionateQuestion={fusionateQuestion}
          />
        );
      }
      return null;
    });

  useEffect(() => {
    if (props.stamp && props.stamp) props.loadQuestionnaireList(props.stamp);
  }, []);

  useEffect(() => {
    props.loadQuestionnaireList(props.stamp);
    props.setModifiedFalse();
  }, [props.stamp]);

  return (
    <div>
      <div className="box home-questionnaires">
        <h3>{Dictionary.homeQuestionnairesInProgress}</h3>
        <h4>
          {Dictionary.stamp} {stamp}
        </h4>
        <div id="questionnaire-list">
          {questionnaires.length > 0 ? (
            <div>
              <div className="ctrl-input">
                <input
                  className="form-control"
                  placeholder={Dictionary.search}
                  type="text"
                  onChange={e => updateFilter(e.target.value)}
                />
              </div>
              <div className="questionnaire-list_header">
                <div>{Dictionary.QUESTIONNAIRE}</div>
                <div>{Dictionary.state}</div>
                <div>{Dictionary.lastUpdate}</div>
              </div>
              {list}
            </div>
          ) : (
            <div className="questionnaire-list_noresults">
              {Dictionary.noQuestionnnaires}
            </div>
          )}
        </div>
      </div>
      {fusion ? (
        <div className="footer_quesionList">
          <button
            className="footer_quesionList-validate"
            type="submit"
            onClick={() => fusionateQuestion()}
          >
            {Dictionary.validate}
          </button>
          <button
            className="footer_quesionList-cancel"
            type="button"
            onClick={() => handleCloseNewQuestion()}
          >
            {Dictionary.cancel}
          </button>
        </div>
      ) : (
        false
      )}
      <ReactModal
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        isOpen={showPopup}
        onRequestClose={handleClosePopup}
        contentLabel="Alert Save"
        className="popup-duplication"
      >
        <div className="popup-header">
          <h3>{Dictionary.dupliquate}</h3>
          <button type="button" onClick={handleClosePopup}>
            <span>X</span>
          </button>
        </div>
        <div className="popup-body">{`${Dictionary.duplicateQuestion}${questionLabel}${Dictionary.duplicateQuestionConfirmation}`}</div>
        <button
          className="popup-yes"
          type="button"
          onClick={() => handleSubmit()}
        >
          {Dictionary.yes}
        </button>
        <button
          className="popup-no"
          type="button"
          onClick={id => handleClosePopup(id)}
        >
          {Dictionary.no}
        </button>
      </ReactModal>
    </div>
  );
};
// Prop types and default props

QuestionnaireList.propTypes = {
  loadQuestionnaireList: PropTypes.func.isRequired,
  questionnaires: PropTypes.array,
  duplicateQuestionnaire: PropTypes.func.isRequired,
  stamp: PropTypes.string,
};

QuestionnaireList.defaultProps = {
  questionnaires: [],
  stamp: '',
};
export default QuestionnaireList;
