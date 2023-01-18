import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Questionnaire from './questionnaire';
import Dropdown from 'widgets/dropdown';
import Loader from 'layout/loader';
import Dictionary from 'utils/dictionary/dictionary';
import { formatDate, getState } from 'utils/component/component-utils';
import { getStampsList } from 'utils/remote-api';
import {
  getHeavyComponentIdByTypeFromGroupIds,
  getWeight,
} from 'utils/component/generic-input-utils';
import { nameFromLabel } from 'utils/utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const QuestionnaireList = props => {
  const {
    activeQuestionnaire,
    questionnaires,
    stamp,
    token,
    duplicateQuestionnaire,
    fusion,
    isComposition,
    handleCloseNewQuestionnaire,
    mergeQuestionnaires,
    currentQuestionnaire,
    loadQuestionnaireList,
    deleteQuestionnaireList,
    selectedStamp,
    setSelectedStamp,
    createComponent,
    updateParentChildren,
    orderComponents,
    componentsStore,
    codesListsStore,
    calculatedVariablesStore,
    externalVariablesStore,
    collectedVariablesStore,
  } = props;

  const { EXTERNAL_ELEMENT, SEQUENCE } = COMPONENT_TYPE;

  const [filter, setFilter] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [questionLabel, setQuestionLabel] = useState('');
  const [checkedQuestionnaire, setCheckedQuestionnaire] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCheck = useCallback(id => setCheckedQuestionnaire(id), []);

  const fusionateQuestionnaire = useCallback(() => {
    mergeQuestionnaires(checkedQuestionnaire, token);
    handleCloseNewQuestionnaire();
  }, [
    checkedQuestionnaire,
    handleCloseNewQuestionnaire,
    mergeQuestionnaires,
    token,
  ]);

  const addQuestionnaireRef = () => {
    const heavierSeqId = getHeavyComponentIdByTypeFromGroupIds(
      componentsStore,
      Object.keys(componentsStore),
      SEQUENCE,
    );
    const weight = getWeight(componentsStore, heavierSeqId);
    const labelQuest = questionnaires.find(
      q => q.id === checkedQuestionnaire,
    ).label;
    const componentState = {
      id: checkedQuestionnaire,
      name: labelQuest ? nameFromLabel(labelQuest) : 'REFQUEST',
      parent: activeQuestionnaire.id,
      weight: weight,
      children: [],
      declarations: '',
      controls: '',
      TargetMode: [''],
      flowcontrol: [],
      redirections: {},
      dynamiqueSpecified: '',
      label: labelQuest,
      type: EXTERNAL_ELEMENT,
    };
    createComponent(
      componentState,
      codesListsStore,
      calculatedVariablesStore,
      externalVariablesStore,
      collectedVariablesStore,
    )
      .then(res => updateParentChildren(res))
      .then(res => orderComponents(res));

    handleCloseNewQuestionnaire();
  };

  const handleValidation = () => {
    return fusion ? fusionateQuestionnaire() : addQuestionnaireRef();
  };

  useEffect(() => {
    getStampsList(token).then(r => {
      r.sort((a, b) => a.label.localeCompare(b.label));
      setOptions(r);
    });
  }, [token]);

  useEffect(() => {
    setSelectedStamp(stamp || 'FAKEPERMISSION');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Find why 2 calls
  useEffect(() => {
    if (selectedStamp)
      loadQuestionnaireList(selectedStamp, token).then(() => setLoading(false));
    else deleteQuestionnaireList();
  }, [selectedStamp, token, loadQuestionnaireList, deleteQuestionnaireList]);

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
    duplicateQuestionnaire(questionId, token);
    props.loadQuestionnaireList(stamp, token);
    setShowPopup(false);
  };

  const list = questionnaires
    .filter(q => {
      return (
        currentQuestionnaire !== q.id &&
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
            fusion={fusion || isComposition}
            handleCheck={handleCheck}
            fusionateQuestionnaire={fusionateQuestionnaire}
          />
        );
      }
      return null;
    });

  return (
    <div>
      <div className="box home-questionnaires">
        <h5 style={{ fontWeight: 'bold' }}>{Dictionary.homeStampChoice}</h5>
        <Dropdown
          onChange={setSelectedStamp}
          value={selectedStamp}
          options={options}
        />
        <h3>{Dictionary.homeQuestionnairesInProgress}</h3>
        <h4>
          {Dictionary.stamp} {stamp}
        </h4>
        {loading && <Loader />}
        {!loading && (
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
        )}
      </div>
      {fusion || isComposition ? (
        <div className="footer_quesionList">
          <button
            className="footer_quesionList-validate"
            type="submit"
            disabled={checkedQuestionnaire === ''}
            onClick={() => handleValidation()}
          >
            {Dictionary.validate}
          </button>
          <button
            className="footer_quesionList-cancel"
            type="button"
            onClick={() => handleCloseNewQuestionnaire()}
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
        <button className="popup-no" type="button" onClick={handleClosePopup}>
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
  token: PropTypes.string,
  selectedStamp: PropTypes.string,
};

QuestionnaireList.defaultProps = {
  questionnaires: [],
  stamp: '',
  token: '',
  selectedStamp: 'FAKEPERMISSION',
};
export default QuestionnaireList;
