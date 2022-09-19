import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import NavigationPrompt from 'react-router-navigation-prompt';
import { COMPONENT_TYPE, DROPDOWN_TYPE } from 'constants/pogues-constants';
import { GENERIC_INPUT } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { VisualizeDropdown } from 'widgets/visualize-dropdown';
import { ComponentNew } from 'layout/component-new';
import { QuestionnaireList } from 'layout/questionnaire-list';
import Loader from 'layout/loader';

const { QUESTION, SEQUENCE, SUBSEQUENCE, LOOP, FILTER, EXTERNAL_ELEMENT } =
  COMPONENT_TYPE;
const { COMPONENT_ID } = GENERIC_INPUT;
const { VISUALIZATION } = DROPDOWN_TYPE;

// PropTypes and defaultProps

export const propTypes = {
  placeholders: PropTypes.object.isRequired,

  saveActiveQuestionnaire: PropTypes.func.isRequired,
  visualizeActiveQuestionnaire: PropTypes.func,
  handleNewPageBreak: PropTypes.func.isRequired,
  isQuestionnaireModified: PropTypes.bool.isRequired,
  isQuestionnaireValid: PropTypes.bool.isRequired,
  isLoopsValid: PropTypes.bool.isRequired,

  componentIdForPageBreak: PropTypes.string.isRequired,
};

export const defaultProps = {
  isQuestionnaireHaveError: false,
  isQuestionnaireModified: false,
  visualizeActiveQuestionnaire: undefined,
  componentIdForPageBreak: '',
};

// Components

export const customModalStyles = {
  content: {
    display: 'absolute',
    textAlign: 'center',
    verticAlalign: 'middle',
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '400px',
    alignItems: 'center',
    transform: 'translate(-50%, -50%)',
  },
};
export const customLoopModalStyles = {
  content: {
    display: 'absolute',
    textAlign: 'center',
    verticAlalign: 'middle',
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '800px',
    alignItems: 'center',
    transform: 'translate(-50%, -50%)',
  },
};

export const customModalbuttonStyles = {
  background: '#15417a',
  color: 'white',
  boxShadow: 'none',
  border: 'none',
  width: '70px',
  height: '30px',
  marginRight: '10px',
  background: '#15417a',
};

const GenericInput = props => {
  const {
    activeQuestionnaire,
    currentQuestionnaire,
    componentIdForPageBreak,
    isLoadingVisualization,
    isLoopsValid,
    isQuestionnaireModified,
    isQuestionnaireValid,
    isQuestionnaireHaveError,
    placeholders,
    stamp,
    token,
    selectedComponent,
    handleNewPageBreak,
    loadQuestionnaireList,
    removeVisualizationError,
    saveActiveQuestionnaire,
    showVisualizationErrorPopup,
    visualizeActiveQuestionnaire,
  } = props;

  const [showNewComponentModal, setShowNewComponentModal] = useState(false);
  const [showNewUnsavedModal, setShowNewUnsavedModal] = useState(false);
  const [showNewLoopModal, setShowNewLoopModal] = useState(false);
  const [typeNewComponent, setTypeNewComponent] = useState('');
  const [showNewQuestionnaire, setShowNewQuestionnaire] = useState(false);

  const handleQuestionnaireRef = () => {
    setShowNewQuestionnaire(true);
    loadQuestionnaireList(stamp, token);
  };

  const handleCloseNewQuestionnaire = () => {
    setShowNewQuestionnaire(false);
  };

  const handleOpenNewComponent = componentType => {
    setShowNewComponentModal(true);
    setTypeNewComponent(componentType);
  };

  const handleCloseNewComponent = () => {
    setShowNewComponentModal(false);
    setShowNewUnsavedModal(false);
    setTypeNewComponent('');
  };

  const handleCloseModal = () => {
    setShowNewUnsavedModal(false);
    setShowNewLoopModal(false);
  };

  const saveQuestionnaire = () => {
    if (!isLoopsValid) {
      setShowNewLoopModal(true);
    } else {
      saveActiveQuestionnaire(token).then(() => {
        if (isQuestionnaireHaveError) {
          setShowNewUnsavedModal(true);
        }
      });
    }
  };

  const newComponentParent = typeNewComponent
    ? placeholders[typeNewComponent].parent
    : '';
  const newComponentWeight = typeNewComponent
    ? placeholders[typeNewComponent].weight
    : 0;

  return (
    <div
      id={COMPONENT_ID}
      style={{ display: showNewComponentModal ? 'none' : 'block' }}
    >
      {isLoadingVisualization && <Loader />}
      <NavigationPrompt
        renderIfNotActive
        when={(crntLocation, nextLocation) =>
          (!nextLocation ||
            !nextLocation.pathname.startsWith(crntLocation.pathname)) &&
          isQuestionnaireModified
        }
      >
        {({ isActive, onCancel, onConfirm }) => {
          if (isActive) {
            return (
              <ReactModal
                isOpen
                ariaHideApp={false}
                shouldCloseOnOverlayClick={false}
                style={customModalStyles}
              >
                <p>{Dictionary.modification}</p>
                <button onClick={onCancel} style={customModalbuttonStyles}>
                  {Dictionary.no}
                </button>
                <button onClick={onConfirm} style={customModalbuttonStyles}>
                  {Dictionary.yes}
                </button>
              </ReactModal>
            );
          }
          return null;
        }}
      </NavigationPrompt>
      <span>{Dictionary.addObject}</span>
      <button
        id="add-question"
        className="btn-white"
        disabled={
          placeholders[QUESTION].parent === ('' || 'idendquest') ||
          (selectedComponent && selectedComponent.type === EXTERNAL_ELEMENT)
        }
        onClick={() => {
          handleOpenNewComponent(QUESTION);
        }}
      >
        <span className="glyphicon glyphicon-plus" />
        {Dictionary.question}
      </button>
      <button
        id="add-subsequence"
        className="btn-white"
        disabled={
          placeholders[SUBSEQUENCE].parent === ('' || 'idendquest') ||
          (selectedComponent && selectedComponent.type === EXTERNAL_ELEMENT)
        }
        onClick={() => {
          handleOpenNewComponent(SUBSEQUENCE);
        }}
      >
        <span className="glyphicon glyphicon-plus" />
        {Dictionary.subSequence}
      </button>
      <button
        id="add-sequence"
        className="btn-white"
        disabled={placeholders[SEQUENCE].parent === ''}
        onClick={() => {
          handleOpenNewComponent(SEQUENCE);
        }}
      >
        <span className="glyphicon glyphicon-plus" />
        {Dictionary.sequence}
      </button>
      <button
        id="add-loop"
        className="btn-white"
        disabled={!placeholders[LOOP]}
        onClick={() => {
          handleOpenNewComponent(LOOP);
        }}
      >
        <span className="glyphicon glyphicon-plus" />
        {Dictionary.loop}
      </button>
      {activeQuestionnaire.dynamiqueSpecified === 'Filtres' ? (
        <button
          id="add-loop"
          className="btn-white"
          disabled={!placeholders[FILTER]}
          onClick={() => {
            handleOpenNewComponent(FILTER);
          }}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.filtre}
        </button>
      ) : (
        false
      )}

      <button
        className="btn-white disabled"
        id="add-pagebreak"
        disabled={!componentIdForPageBreak}
        onClick={() => {
          handleNewPageBreak(componentIdForPageBreak);
        }}
      >
        <span className="glyphicon glyphicon-plus" />
        {Dictionary.pageBreak}
      </button>
      <VisualizeDropdown top typeDropDown={EXTERNAL_ELEMENT} />
      <button
        className="btn-yellow"
        disabled={!isQuestionnaireModified}
        onClick={() => {
          saveQuestionnaire();
        }}
        id="save"
      >
        {Dictionary.save}
        <span className="glyphicon glyphicon-floppy-disk" />
      </button>
      <VisualizeDropdown
        top
        typeDropDown={VISUALIZATION}
        disabled={!isQuestionnaireValid}
        visualizeActiveQuestionnaire={visualizeActiveQuestionnaire}
        token={token}
      />
      <button
        id="add-questionnaire"
        className="btn-white"
        type="button"
        onClick={() => {
          handleNewQuestion();
        }}
      >
        <span className="glyphicon glyphicon-plus" />
        {Dictionary.QUESTIONNAIRE}
      </button>

      <button className="btn-yellow disabled" id="publish">
        {Dictionary.publishQuestionnaire}
        <span className="glyphicon glyphicon-share-alt" />
      </button>
      <ReactModal
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        isOpen={showNewComponentModal}
        onRequestClose={handleCloseNewComponent}
        contentLabel={
          typeNewComponent ? Dictionary[`componentNew${typeNewComponent}`] : ''
        }
      >
        <div className="popup">
          <div className="popup-header">
            <h3>
              {typeNewComponent
                ? Dictionary[`componentNew${typeNewComponent}`]
                : ''}
            </h3>
            <button type="button" onClick={handleCloseNewComponent}>
              <span>X</span>
            </button>
          </div>
          <div className="popup-body">
            <ComponentNew
              parentId={newComponentParent}
              weight={newComponentWeight}
              type={typeNewComponent}
              onCancel={handleCloseNewComponent}
              onSuccess={handleCloseNewComponent}
            />
          </div>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={showNewUnsavedModal}
        ariaHideApp={false}
        style={customModalStyles}
      >
        <p>{Dictionary.notSaved}</p>
        <button onClick={handleCloseModal} style={customModalbuttonStyles}>
          {Dictionary.close}
        </button>
      </ReactModal>
      <ReactModal
        isOpen={showVisualizationErrorPopup}
        ariaHideApp={false}
        style={customModalStyles}
      >
        <p>{Dictionary.visualizationError}</p>
        <button
          onClick={removeVisualizationError}
          style={customModalbuttonStyles}
        >
          {Dictionary.close}
        </button>
      </ReactModal>
      <ReactModal
        isOpen={showNewLoopModal}
        ariaHideApp={false}
        style={customLoopModalStyles}
      >
        <p>{Dictionary.loopNotSaved}</p>
        <button onClick={handleCloseModal} style={customModalbuttonStyles}>
          {Dictionary.close}
        </button>
      </ReactModal>
      <ReactModal
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        isOpen={showNewQuestionnaire}
        onRequestClose={handleCloseNewQuestionnaire}
      >
        <div className="popup">
          <div className="popup-header">
            <button type="button" onClick={handleCloseNewQuestionnaire}>
              <span>X</span>
            </button>
          </div>
          <div className="popup-body">
            <QuestionnaireList
              fusion
              handleCloseNewQuestion={handleCloseNewQuestion}
              currentQuestionnaire={currentQuestionnaire}
              handleCloseNewQuestionnaire={handleCloseNewQuestionnaire}
            />
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default GenericInput;
