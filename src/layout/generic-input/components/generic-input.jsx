import { useCallback, useState } from 'react';

import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import NavigationPrompt from 'react-router-navigation-prompt';

import { domSelectorForModal } from '../../../constants/dom-constants';
import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import { useReadonly } from '../../../hooks/useReadonly';
import Dictionary from '../../../utils/dictionary/dictionary';
import { useOidc } from '../../../utils/oidc';
import { ExternalQuestionnaireDropdown } from '../../../widgets/external-questionnaire-dropdown';
import { VisualizeDropdown } from '../../../widgets/visualize-dropdown';
import { ComponentNew } from '../../component-new';
import Loader from '../../loader';

const {
  QUESTION,
  SEQUENCE,
  SUBSEQUENCE,
  LOOP,
  ROUNDABOUT,
  FILTER,
  EXTERNAL_ELEMENT,
} = COMPONENT_TYPE;

// PropTypes and defaultProps

export const propTypes = {
  activeQuestionnaire: PropTypes.object,
  placeholders: PropTypes.object.isRequired,
  isLoadingVisualization: PropTypes.bool,
  saveActiveQuestionnaire: PropTypes.func.isRequired,
  isQuestionnaireHaveError: PropTypes.bool,
  isQuestionnaireModified: PropTypes.bool,
  isQuestionnaireValid: PropTypes.bool.isRequired,
  isLoopsValid: PropTypes.bool.isRequired,
  selectedComponent: PropTypes.object,
  removeVisualizationError: PropTypes.func,
  showVisualizationErrorPopup: PropTypes.string,
};

export const defaultProps = {
  activeQuestionnaire: {},
  isLoadingVisualization: false,
  isQuestionnaireHaveError: false,
  isQuestionnaireModified: false,
  selectedComponent: undefined,
  removeVisualizationError: undefined,
  showVisualizationErrorPopup: '',
};

// Components

export const customLoopModalStyles = {
  content: {
    display: 'absolute',
    textAlign: 'center',
    verticalAlign: 'middle',
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
};

/**
 * Display a navbar on top of the questionnaire which allow to add elements to
 * the questionnaire, save the questionnaire and visualize it.
 */
function GenericInput(props) {
  const {
    activeQuestionnaire,
    isLoadingVisualization,
    isLoopsValid,
    isQuestionnaireModified,
    isQuestionnaireValid,
    isQuestionnaireHaveError,
    placeholders,
    selectedComponent,
    removeVisualizationError,
    saveActiveQuestionnaire,
    showVisualizationErrorPopup,
  } = props;

  const [showNewComponentModal, setShowNewComponentModal] = useState(false);
  const [showNewUnsavedModal, setShowNewUnsavedModal] = useState(false);
  const [showNewLoopModal, setShowNewLoopModal] = useState(false);
  const [typeNewComponent, setTypeNewComponent] = useState('');

  const oidc = useOidc();
  const token = oidc.oidcTokens.accessToken;

  const isReadonly = useReadonly();

  const handleOpenNewComponent = (componentType) => {
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

  const testExistFromQuestionnaire = useCallback(
    (crntLocation, nextLocation) =>
      !nextLocation?.pathname.startsWith(crntLocation.pathname) &&
      isQuestionnaireModified,
    [isQuestionnaireModified],
  );

  const newComponentParent = typeNewComponent
    ? placeholders[typeNewComponent].parent
    : '';
  const newComponentWeight = typeNewComponent
    ? placeholders[typeNewComponent].weight
    : 0;

  return (
    <div
      id="generic-input"
      style={{ display: showNewComponentModal ? 'none' : 'block' }}
    >
      {isLoadingVisualization && <Loader />}
      <NavigationPrompt renderIfNotActive when={testExistFromQuestionnaire}>
        {({ isActive, onCancel, onConfirm }) => {
          if (isActive) {
            return (
              <ReactModal
                parentSelector={domSelectorForModal}
                isOpen
                ariaHideApp={false}
                shouldCloseOnOverlayClick={false}
                className="custom-modal"
              >
                <p>{Dictionary.modification}</p>
                <button onClick={onCancel} className="modal-button">
                  {Dictionary.no}
                </button>
                <button onClick={onConfirm} className="modal-button">
                  {Dictionary.yes}
                </button>
              </ReactModal>
            );
          }
          return null;
        }}
      </NavigationPrompt>
      <div className="actionBar">
        <button
          id="add-question"
          className="btn-white"
          disabled={
            isReadonly ||
            placeholders[QUESTION].parent === '' ||
            placeholders[QUESTION].parent === 'idendquest' ||
            (selectedComponent && selectedComponent.type === EXTERNAL_ELEMENT)
          }
          onClick={() => handleOpenNewComponent(QUESTION)}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.question}
        </button>
        <button
          id="add-subsequence"
          className="btn-white"
          disabled={
            isReadonly ||
            placeholders[SUBSEQUENCE].parent === '' ||
            placeholders[SUBSEQUENCE].parent === 'idendquest' ||
            (selectedComponent && selectedComponent.type === EXTERNAL_ELEMENT)
          }
          onClick={() => handleOpenNewComponent(SUBSEQUENCE)}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.subSequence}
        </button>
        <button
          id="add-sequence"
          className="btn-white"
          disabled={isReadonly || placeholders[SEQUENCE].parent === ''}
          onClick={() => handleOpenNewComponent(SEQUENCE)}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.sequence}
        </button>
        <button
          id="add-loop"
          className="btn-white"
          disabled={isReadonly || !placeholders[LOOP]}
          onClick={() => handleOpenNewComponent(LOOP)}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.loop}
        </button>
        <button
          id="add-roundabout"
          className="btn-white"
          disabled={
            isReadonly ||
            !selectedComponent ||
            (selectedComponent.type !== SEQUENCE &&
              selectedComponent.type !== SUBSEQUENCE &&
              selectedComponent.type !== EXTERNAL_ELEMENT)
          }
          onClick={() => handleOpenNewComponent(ROUNDABOUT)}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.roundabout}
        </button>
        {activeQuestionnaire.dynamiqueSpecified === 'Filtres' && (
          <button
            id="add-filter"
            className="btn-white"
            disabled={isReadonly || !placeholders[FILTER]}
            onClick={() => handleOpenNewComponent(FILTER)}
          >
            <span className="glyphicon glyphicon-plus" />
            {Dictionary.filtre}
          </button>
        )}
        <ExternalQuestionnaireDropdown
          questionnaireId={activeQuestionnaire.id}
          disabled={
            isReadonly ||
            (selectedComponent &&
              selectedComponent.type !== SEQUENCE &&
              selectedComponent.type !== EXTERNAL_ELEMENT)
          }
        />
        <button
          className="btn-yellow"
          disabled={isReadonly || !isQuestionnaireModified}
          onClick={() => saveQuestionnaire()}
          id="save"
        >
          {Dictionary.save}
          <span className="glyphicon glyphicon-floppy-disk" />
        </button>
        <VisualizeDropdown
          disabled={!isQuestionnaireValid}
          isDirtyState={isQuestionnaireModified}
          questionnaireId={activeQuestionnaire.id}
          token={token}
        />
      </div>
      <ReactModal
        parentSelector={domSelectorForModal}
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
              selectedComponent={selectedComponent?.id}
            />
          </div>
        </div>
      </ReactModal>
      <ReactModal
        parentSelector={domSelectorForModal}
        isOpen={showNewUnsavedModal}
        ariaHideApp={false}
        className="custom-modal"
      >
        <p>{Dictionary.notSaved}</p>
        <button onClick={handleCloseModal} className="modal-button">
          {Dictionary.close}
        </button>
      </ReactModal>
      <ReactModal
        parentSelector={domSelectorForModal}
        isOpen={showVisualizationErrorPopup !== ''}
        ariaHideApp={false}
        className="custom-modal"
      >
        <p>{Dictionary.visualizationError}</p>
        <p className="api-error-message">{showVisualizationErrorPopup}</p>
        <button onClick={removeVisualizationError} className="modal-button">
          {Dictionary.close}
        </button>
      </ReactModal>
      <ReactModal
        parentSelector={domSelectorForModal}
        isOpen={showNewLoopModal}
        ariaHideApp={false}
        className="custom-modal"
      >
        <p>{Dictionary.loopNotSaved}</p>
        <button onClick={handleCloseModal} className="modal-button">
          {Dictionary.close}
        </button>
      </ReactModal>
    </div>
  );
}

GenericInput.propTypes = propTypes;
GenericInput.defaultProps = defaultProps;

export default GenericInput;
