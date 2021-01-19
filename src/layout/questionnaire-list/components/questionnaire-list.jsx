import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Questionnaire from './questionnaire';
import isEqual from 'lodash.isequal';

import Dictionary from 'utils/dictionary/dictionary';
import { formatDate, getState } from 'utils/component/component-utils';

const QuestionnaireList = props => {
  const { questionnaires, user, duplicateQuestionnaire } = props;
  const [filter, setFilter] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [questionList, seQuestionList] = useState([]);
  // useEffect(() => {
  //   props.loadQuestionnaireList(user.permission);
  // }, []);

  useEffect(() => {
    if (!isEqual(questionnaires, questionList)) {
      props.loadQuestionnaireList(user.permission);
      seQuestionList(questionnaires);
    }
  }, [user, questionnaires]);

  // useEffect(() => {
  //   if (props.user && props.user.permission)
  //     props.loadQuestionnaireList(props.user.permission);
  // }, []);

  useEffect(() => {
    props.loadQuestionnaireList(user.permission);
  }, [user.permission]);

  const updateFilter = value => {
    setFilter(value);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleOpenPopup = id => {
    setShowPopup(true);
    setQuestionId(id);
  };
  const handleSubmit = () => {
    duplicateQuestionnaire(questionId);
    props.loadQuestionnaireList(props.user.permission);

    setShowPopup(false);
  };

  const list = questionnaires
    .filter(q => {
      return (
        filter === '' ||
        q.label.toLowerCase().indexOf(filter) >= 0 ||
        getState(q.final)
          .toLowerCase()
          .indexOf(filter) >= 0 ||
        (q.lastUpdatedDate &&
          formatDate(q.lastUpdatedDate)
            .toLowerCase()
            .indexOf(filter) >= 0) ||
        !q
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
            // duplicateQuestionnaire={props.duplicateQuestionnaire}
            handleOpenPopup={id => handleOpenPopup(id)}
          />
        );
      }
    });

  return (
    <div className="box home-questionnaires">
      <h3>{Dictionary.homeQuestionnairesInProgress}</h3>
      <h4>
        {Dictionary.stamp} {user.permission}
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
        <div className="popup-body">{Dictionary.duplicateQuestion}</div>
        <button className="popup-yes" onClick={() => handleSubmit()}>
          {Dictionary.yes}
        </button>
        <button className="popup-no" onClick={id => handleClosePopup(id)}>
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
  user: PropTypes.shape({
    name: PropTypes.string,
    permission: PropTypes.string,
    id: PropTypes.string,
    picture: PropTypes.string,
  }),
};

QuestionnaireList.defaultProps = {
  questionnaires: [],
  user: {},
};
export default QuestionnaireList;
