import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import QuestionnaireListItem from './questionnaire-list-item';
import Dropdown from '../../../widgets/dropdown';
import Loader from '../../loader';
import Dictionary from '../../../utils/dictionary/dictionary';
import { formatDate, getState } from '../../../utils/component/component-utils';
import { getStampsList } from '../../../utils/remote-api';
import { getWeight } from '../../../utils/component/generic-input-utils';
import { COMPONENT_TYPE, TCM } from '../../../constants/pogues-constants';
import { useAuth } from '../../../utils/oidc/useAuth';

const { EXTERNAL_ELEMENT, SEQUENCE } = COMPONENT_TYPE;

const QuestionnaireList = props => {
  const {
    activeQuestionnaire,
    selectedComponentId,
    questionnaires,
    stamp,
    authType,
    duplicateQuestionnaire,
    isFusion,
    isComposition,
    isTcm,
    handleCloseNewQuestionnaire,
    mergeQuestionnaires,
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
    handleNewChildQuestionnaireRef,
  } = props;

  const { oidc } = useAuth(authType);
  const token = oidc.getTokens().accessToken;
  let actionLabel = Dictionary.duplicate;
  if (isComposition) actionLabel = Dictionary.add;
  if (isFusion) actionLabel = Dictionary.merge;

  const [filter, setFilter] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [questionLabel, setQuestionLabel] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fusionateQuestionnaire = useCallback(
    checkedQuestionnaire => {
      mergeQuestionnaires(checkedQuestionnaire, token);
      handleCloseNewQuestionnaire();
    },
    [handleCloseNewQuestionnaire, mergeQuestionnaires, token],
  );

  function addQuestionnaireRef(checkedQuestionnaire) {
    const weight = selectedComponentId
      ? getWeight(componentsStore, selectedComponentId)
      : Object.values(componentsStore).filter(
          component =>
            (component.type === SEQUENCE && component.id !== 'idendquest') ||
            component.type === EXTERNAL_ELEMENT,
        ).length;
    const externalQuestionnaire = questionnaires.find(
      q => q.id === checkedQuestionnaire,
    );
    const componentState = {
      id: checkedQuestionnaire,
      name:
        externalQuestionnaire.name ||
        externalQuestionnaire.label.replace(' ', ''),
      parent: activeQuestionnaire.id,
      weight: weight,
      children: [],
      declarations: '',
      controls: '',
      TargetMode: [''],
      flowcontrol: [],
      redirections: {},
      dynamiqueSpecified: '',
      label: externalQuestionnaire.label,
      type: EXTERNAL_ELEMENT,
    };
    createComponent(
      componentState,
      calculatedVariablesStore,
      externalVariablesStore,
      collectedVariablesStore,
      codesListsStore,
    )
      .then(updateParentChildren)
      .then(orderComponents)
      .then(handleNewChildQuestionnaireRef(checkedQuestionnaire))
      .then(handleCloseNewQuestionnaire);
  }

  const handleAction = (id, label) => {
    if (isComposition) return addQuestionnaireRef(id);
    if (isFusion) return fusionateQuestionnaire(id);
    return handleOpenPopup(id, label);
  };

  useEffect(() => {
    getStampsList(token).then(r => {
      r.sort((a, b) => a.label.localeCompare(b.label));
      setOptions(r);
    });
  }, [token]);

  useEffect(() => {
    setSelectedStamp(isTcm ? TCM.owner : stamp || 'FAKEPERMISSION');
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
    loadQuestionnaireList(stamp, token);
    setShowPopup(false);
  };

  const list = questionnaires
    .filter(q => {
      return (
        activeQuestionnaire.id !== q.id &&
        !activeQuestionnaire.childQuestionnaireRef?.includes(q.id) &&
        (!isTcm || q.campaigns.some(campaign => campaign === TCM.id)) &&
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
          <QuestionnaireListItem
            key={q.id}
            id={q.id}
            label={q.label}
            lastUpdatedDate={q.lastUpdatedDate}
            isHome={!isFusion && !isComposition}
            handleAction={handleAction}
            actionLabel={actionLabel}
            activeQuestionnaireTargetMode={activeQuestionnaire.TargetMode}
            questionnaireTargetMode={q.TargetMode}
            sameFormulaLanguage={
              activeQuestionnaire.formulaSpecified === q.formulaSpecified
            }
            sameDynamic={
              activeQuestionnaire.dynamiqueSpecified === q.dynamiqueSpecified
            }
          />
        );
      }
      return null;
    });

  return (
    <div className="home-questionnaires-container">
      {(isFusion || isComposition) && (
        <div className="questionList-cancel-zone">
          <button
            className="btn-grey glyphicon glyphicon-arrow-left questionList-cancel"
            type="button"
            onClick={() => handleCloseNewQuestionnaire()}
          >
            {Dictionary.cancel}
          </button>
        </div>
      )}
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
        {loading ? (
          <Loader />
        ) : (
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
                  <div />
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
  activeQuestionnaire: PropTypes.object.isRequired,
  selectedComponentId: PropTypes.string,
  questionnaires: PropTypes.array,
  duplicateQuestionnaire: PropTypes.func.isRequired,
  stamp: PropTypes.string,
  authType: PropTypes.string,
  selectedStamp: PropTypes.string,
  isFusion: PropTypes.bool,
  isComposition: PropTypes.bool,
  isTcm: PropTypes.bool,
  handleNewChildQuestionnaireRef: PropTypes.func,
  handleCloseNewQuestionnaire: PropTypes.func,
  mergeQuestionnaires: PropTypes.func,
  deleteQuestionnaireList: PropTypes.func,
  setSelectedStamp: PropTypes.func,
  createComponent: PropTypes.func,
  updateParentChildren: PropTypes.func,
  orderComponents: PropTypes.func,
  componentsStore: PropTypes.object,
  codesListsStore: PropTypes.object,
  calculatedVariablesStore: PropTypes.object,
  externalVariablesStore: PropTypes.object,
  collectedVariablesStore: PropTypes.object,
};

QuestionnaireList.defaultProps = {
  selectedComponentId: undefined,
  questionnaires: [],
  stamp: '',
  authType: '',
  selectedStamp: 'FAKEPERMISSION',
  isFusion: false,
  isComposition: false,
  isTcm: false,
  handleNewChildQuestionnaireRef: undefined,
  handleCloseNewQuestionnaire: undefined,
  mergeQuestionnaires: undefined,
  deleteQuestionnaireList: undefined,
  setSelectedStamp: undefined,
  createComponent: undefined,
  updateParentChildren: undefined,
  orderComponents: undefined,
  componentsStore: {},
  codesListsStore: {},
  calculatedVariablesStore: {},
  externalVariablesStore: {},
  collectedVariablesStore: {},
};
export default QuestionnaireList;
