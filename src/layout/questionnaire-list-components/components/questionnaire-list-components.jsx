import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import QuestionnaireComponent from './questionnaire-component';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

import { ComponentEdit } from 'layout/component-edit';
import { ConfirmDialog } from 'layout/confirm-dialog';
import { QuestionnaireEdit } from 'layout/questionnaire-edit';
import { ErrorsIntegrity as ErrorsIntegrityPanel } from 'layout/errors-integrity';

import Dictionary from 'utils/dictionary/dictionary';
import { getSortedChildren } from 'utils/component/component-utils';
const {LOOP} = COMPONENT_TYPE;

const QuestionnaireListComponents = props => {

  const {
    questionnaire,
    componentsStore,
    editingComponentId,
    errorsIntegrity,
    setSelectedComponentId,
  } = props;

	useEffect(() => {
    props.setSelectedComponentId('');
  }, []);

  const [showQuestionnaireModal, setShowQuestionnaireModal] = useState(false);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [showRemoveQuestionnaireDialog, setShowRemoveQuestionnaireDialog] = useState(false);


// Utils

function renderComponentsByParent(parent, props, actions) {
  return getSortedChildren(props.componentsStore, parent).map(key => {
    if(props.componentsStore[key].id !== "idendquest") {
      const subTree = renderComponentsByParent(key, props, actions);
      const component = props.componentsStore[key];
      if(component.type !== LOOP) {
        return (
          <QuestionnaireComponent
            key={component.id}
            selected={props.selectedComponentId === key}
            component={component}
            visualizeActiveQuestionnaire={props.visualizeActiveQuestionnaire}
            setSelectedComponentId={props.setSelectedComponentId}
            setEditingComponentId={props.setEditingComponentId}
            duplicateComponentAndVariables={props.duplicateComponentAndVariables}
            moveComponent={props.dragComponent}
            removeComponent={props.removeComponent}
            integrityErrorsByType={props.errorsIntegrity[key]}
            parentType={props.componentsStore[component.parent].type}
            actions={actions}
            handleRemovePageBreak={event => {
              event.preventDefault();
              props.handleRemovePageBreak(key);
            }}
          >
            {subTree}
          </QuestionnaireComponent>
        );
      }
    }
  }, {});
}

  const handleOpenComponentDetail = () => {
    setShowComponentModal(true)
    }

  const handleCloseComponentDetail = () => {
    setShowComponentModal(false)
    }

  const handleOpenRemoveQuestionnaireDialog = () => {
    setShowRemoveQuestionnaireDialog(true)
    }

  const handleCloseRemoveQuestionnaireDialog = () => {
    setShowRemoveQuestionnaireDialog(false)
    }  

  const handleQuestionnaireDelete = () => {
    props.removeQuestionnaire(props.questionnaire.id).then(() => {
      props.navigate('/');
    });
  } 
  
  const  renderComponentsByParent = (parent, props, actions) => {
    return getSortedChildren(props.componentsStore, parent).map(key => {
      if(props.componentsStore[key].id !== "idendquest") { 
        const subTree = renderComponentsByParent(key, props, actions);
        const component = props.componentsStore[key];
        if(component.type !== LOOP) {
          return (
            <QuestionnaireComponent
              key={component.id}
              selected={props.selectedComponentId === key}
              component={component}
              visualizeActiveQuestionnaire={props.visualizeActiveQuestionnaire}
              setSelectedComponentId={props.setSelectedComponentId}
              setEditingComponentId={props.setEditingComponentId}
              duplicateComponentAndVariables={props.duplicateComponentAndVariables}
              moveComponent={props.dragComponent}
              removeComponent={props.removeComponent}
              integrityErrorsByType={props.errorsIntegrity[key]}
              parentType={props.componentsStore[component.parent].type}
              actions={actions}
              handleRemovePageBreak={event => {
                event.preventDefault();
                props.handleRemovePageBreak(key);
              }}
            >
              {subTree}
            </QuestionnaireComponent>
          );
        }
      } 
    }, {});
  }

  const componentType =
  componentsStore[editingComponentId] &&
  componentsStore[editingComponentId].type;

  const componentHeader = Dictionary[`componentEdit${componentType}`] || '';


  return (
    <div id="questionnaire">
      {!questionnaire.id ? (
        <span className="fa fa-spinner fa-pulse fa-2x" />
      ) : (
        <div>
          {/* Questionnaire edit */}

          <div id="questionnaire-head">
            <h4>{questionnaire.label}</h4>

            <div>
              <button
                className="btn-yellow"
                onClick={handleOpenQuestionnaireDetail}
              >
                {Dictionary.showDetail}
              </button>
              <button
                className="btn-yellow"
                onClick={handleOpenRemoveQuestionnaireDialog}
              >
                {Dictionary.remove}
                <span className="glyphicon glyphicon-trash" />
              </button>
            </div>
          </div>

          {/* Questionnaire integrity errors */}

          <ErrorsIntegrityPanel
            errorsIntegrity={errorsIntegrity}
            componentsStore={componentsStore}
            setSelectedComponentId={setSelectedComponentId}
          />

          {/* Questionnaire components */}

          <div id="questionnaire-items">
            {renderComponentsByParent(questionnaire.id, props, {
              handleOpenComponentDetail: handleOpenComponentDetail,
            })}
          </div>

          {/* Questionnaire edit */}

          <ReactModal
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            isOpen={showQuestionnaireModal}
            onRequestClose={handleCloseQuestionnaireDetail}
            contentLabel={Dictionary.questionnaireDetail}
          >
            <div className="popup">
              <div className="popup-header">
                <h3>{Dictionary.questionnaireDetail}</h3>

                <button
                  type="button"
                  onClick={handleCloseQuestionnaireDetail}
                >
                  <span>X</span>
                </button>
              </div>
              <div className="popup-body">
                <QuestionnaireEdit
                  onCancel={handleCloseQuestionnaireDetail}
                  onSuccess={handleCloseQuestionnaireDetail}
                />
              </div>
            </div>
          </ReactModal>

          {/* Component edit */}

          <ReactModal
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            isOpen={showComponentModal}
            onRequestClose={handleCloseComponentDetail}
            contentLabel={componentHeader}
          >
            <div className="popup">
              <div className="popup-header">
                <h3>{componentHeader}</h3>
                <button
                  type="button"
                  onClick={handleCloseComponentDetail}
                >
                  <span>X</span>
                </button>
              </div>
              <div className="popup-body">
                <ComponentEdit
                  onCancel={handleCloseComponentDetail}
                  onSuccess={handleCloseComponentDetail}
                />
              </div>
            </div>
          </ReactModal>

          {/* Remove dialog */}

          <ConfirmDialog
            showConfirmModal={showRemoveQuestionnaireDialog}
            confirm={handleQuestionnaireDelete}
            closePopup={handleCloseRemoveQuestionnaireDialog}
          />
        </div>
      )}
    </div>
  );

}

// Prop types and default Props
QuestionnaireListComponents.propTypes = {
  questionnaire: PropTypes.object.isRequired,
  componentsStore: PropTypes.object,
  errorsIntegrity: PropTypes.object,

  selectedComponentId: PropTypes.string.isRequired,
  editingComponentId: PropTypes.string.isRequired,

  setSelectedComponentId: PropTypes.func.isRequired,
  setEditingComponentId: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
  dragComponent: PropTypes.func.isRequired,
  duplicateComponentAndVariables: PropTypes.func.isRequired,
  removeQuestionnaire: PropTypes.func.isRequired,
  visualizeActiveQuestionnaire: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  handleRemovePageBreak: PropTypes.func.isRequired,
};

QuestionnaireListComponents.defaultProps = {
  componentsStore: {},
  errorsIntegrity: {},
};

export default DragDropContext(HTML5Backend)(QuestionnaireListComponents);