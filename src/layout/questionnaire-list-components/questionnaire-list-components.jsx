import { forwardRef, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactModal from 'react-modal';

import { domSelectorForModal } from '../../constants/dom-constants';
import { COMPONENT_TYPE } from '../../constants/pogues-constants';
import { useReadonly } from '../../hooks/useReadonly';
import { getSortedChildren } from '../../utils/component/component-utils';
import Dictionary from '../../utils/dictionary/dictionary';
import { ComponentEdit } from '../component-edit';
import { ConfirmDialog } from '../confirm-dialog';
import { ErrorsIntegrity as ErrorsIntegrityPanel } from '../errors-integrity';
import Loader from '../loader';
import { QuestionnaireEdit } from '../questionnaire-edit';
import QuestionnaireComponent from './questionnaire-component';

const { LOOP, FILTER, NESTEDFILTRE } = COMPONENT_TYPE;

function withForwardRef(Component) {
  const WrappedComponent = (props, ref) => {
    return <Component {...props} forwardedRef={ref} />;
  };

  return forwardRef(WrappedComponent);
}

const QuestionnaireListComponents = (props) => {
  const {
    duplicateQuestionnaire,
    forwardedRef,
    token,
    questionnaire,
    componentsStore,
    editingComponentId,
    errorsIntegrity,
    setSelectedComponentId,
    activeCalculatedVariables,
    calculatedVariables,
    removeQuestionnaire,
    navigate,
  } = props;

  const isReadonly = useReadonly();

  useEffect(() => {
    setSelectedComponentId('');
  }, [setSelectedComponentId]);

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showQuestionnaireModal, setShowQuestionnaireModal] = useState(false);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [showRemoveQuestionnaireDialog, setShowRemoveQuestionnaireDialog] =
    useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Temporary : to help diagnose calculated variables bug
  useEffect(() => {
    if (questionnaire.id && calculatedVariables[questionnaire.id]) {
      setShowWarning(
        Object.keys(activeCalculatedVariables).length === 0 &&
          Object.keys(calculatedVariables[questionnaire.id]).length !== 0,
      );
    }
  }, [activeCalculatedVariables, calculatedVariables, questionnaire]);

  const handleOpenComponentDetail = () => setShowComponentModal(true);

  const componentFilterConditionInitial = (id) => {
    return Object.values(componentsStore).filter(
      (component) =>
        component.type === FILTER && component.initialMember === id,
    );
  };
  const componentFilterConditionFinal = (id) => {
    return Object.values(componentsStore).filter(
      (component) => component.type === FILTER && component.finalMember === id,
    );
  };

  const renderComponentsByParent = (parent, props, actions) => {
    return getSortedChildren(props.componentsStore, parent).map((key) => {
      if (props.componentsStore[key].id !== 'idendquest') {
        const subTree = renderComponentsByParent(key, props, actions);
        const component = props.componentsStore[key];
        if (
          component.type !== LOOP &&
          component.type !== FILTER &&
          component.type !== NESTEDFILTRE
        ) {
          return (
            <QuestionnaireComponent
              ref={forwardedRef}
              key={component.id}
              selected={props.selectedComponentId === key}
              component={component}
              setSelectedComponentId={props.setSelectedComponentId}
              setEditingComponentId={props.setEditingComponentId}
              duplicateComponentAndVariables={
                props.duplicateComponentAndVariables
              }
              moveComponent={props.dragComponent}
              removeComponent={props.removeComponent}
              removeQuestionnaireRef={props.removeQuestionnaireRef}
              integrityErrorsByType={props.errorsIntegrity[key]}
              parentType={props.componentsStore[component.parent].type}
              actions={actions}
              componentFiltersInitial={componentFilterConditionInitial(
                props.componentsStore[key].id,
              )}
              componentFiltersFinal={componentFilterConditionFinal(
                props.componentsStore[key].id,
              )}
            >
              {subTree}
            </QuestionnaireComponent>
          );
        }
        return null;
      }
      return null;
    }, {});
  };

  const componentType = componentsStore[editingComponentId]?.type;

  const componentHeader = Dictionary[`componentEdit${componentType}`] || '';

  return (
    <div id="questionnaire">
      {!questionnaire.id ? (
        <Loader />
      ) : (
        <div>
          {/* Questionnaire edit */}

          <div id="questionnaire-head">
            <h4>{questionnaire.label}</h4>
            <div>
              <button
                className="btn-yellow"
                onClick={() => setShowQuestionnaireModal(true)}
              >
                {Dictionary.showDetail}
              </button>
              <button
                className="btn-yellow"
                onClick={() => setShowDuplicateModal(true)}
              >
                {Dictionary.duplicate}
              </button>
              <button
                className="btn-yellow"
                disabled={isReadonly}
                onClick={() => setShowRemoveQuestionnaireDialog(true)}
              >
                {Dictionary.remove}
                <span className="glyphicon glyphicon-trash" />
              </button>
            </div>
          </div>

          {/* Temporary warning to help diagnose the bug concerning disappearing of calculated variables */}
          {showWarning && (
            <div id="errors-integrity">
              <div className="errors-integrity__inner">
                <div
                  className="errors-integrity__alert"
                  style={{ marginTop: '2.5em' }}
                >
                  <div className="alert-icon big">
                    <div className="alert-triangle" />!
                  </div>
                </div>
                <div className="errors-integrity__list">
                  <ul>
                    <li>
                      Il n'y a plus de variables calculées dans votre
                      questionnaire.{' '}
                      <strong>
                        Si ce n'est pas une action voulue de votre part
                      </strong>
                      , il s'agit probablement d'une erreur de l'application.
                      Dans ce cas, veuillez contacter au plus vite{' '}
                      <a href="mailto:atelier-conception-enquetes@insee.fr;service-numerique-atelier-conception-enquetes@insee.fr">
                        l'équipe de l'atelier de conception
                      </a>{' '}
                      pour que nous corrigions ce problème.
                    </li>
                    <li>
                      Par ailleurs, si vous quittez votre questionnaire
                      maintenant sans le sauvegarder, vous retrouverez les
                      variables calculées en retournant sur le questionnaire.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

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
            parentSelector={domSelectorForModal}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            isOpen={showQuestionnaireModal}
            onRequestClose={() => setShowQuestionnaireModal(false)}
            contentLabel={Dictionary.questionnaireDetail}
          >
            <div className="popup">
              <div className="popup-header">
                <h3>{Dictionary.questionnaireDetail}</h3>

                <button
                  type="button"
                  onClick={() => setShowQuestionnaireModal(false)}
                >
                  <span>X</span>
                </button>
              </div>
              <div className="popup-body">
                <QuestionnaireEdit
                  onCancel={() => setShowQuestionnaireModal(false)}
                  onSuccess={() => setShowQuestionnaireModal(false)}
                />
              </div>
            </div>
          </ReactModal>

          {/* Component edit */}

          <ReactModal
            parentSelector={domSelectorForModal}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            isOpen={showComponentModal}
            onRequestClose={() => setShowComponentModal(false)}
            contentLabel={componentHeader}
          >
            <div className="popup">
              <div className="popup-header">
                <h3>{componentHeader}</h3>
                <button
                  type="button"
                  onClick={() => setShowComponentModal(false)}
                >
                  <span>X</span>
                </button>
              </div>
              <div className="popup-body">
                <ComponentEdit
                  onCancel={() => setShowComponentModal(false)}
                  onSuccess={() => setShowComponentModal(false)}
                />
              </div>
            </div>
          </ReactModal>

          {/* Duplicate */}

          <ConfirmDialog
            showConfirmModal={showDuplicateModal}
            closePopup={() => setShowRemoveQuestionnaireDialog(false)}
            confirm={() =>
              duplicateQuestionnaire(questionnaire.id, token).then(() =>
                setShowDuplicateModal(false),
              )
            }
            title={Dictionary.dupliquate}
            message={`${Dictionary.duplicateQuestion}${questionnaire.label}`}
          />

          {/* Remove dialog */}

          <ConfirmDialog
            showConfirmModal={showRemoveQuestionnaireDialog}
            closePopup={() => setShowRemoveQuestionnaireDialog(false)}
            confirm={() =>
              removeQuestionnaire(questionnaire.id, token).then(() =>
                navigate('/'),
              )
            }
            title={Dictionary.confirmBodyTitle}
            message={Dictionary.confirmBodyMessage}
          />
        </div>
      )}
    </div>
  );
};

// Prop types and default Props
QuestionnaireListComponents.propTypes = {
  token: PropTypes.string,
  questionnaire: PropTypes.object.isRequired,
  componentsStore: PropTypes.object,
  errorsIntegrity: PropTypes.object,
  selectedComponentId: PropTypes.string.isRequired,
  editingComponentId: PropTypes.string.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
  setEditingComponentId: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
  removeQuestionnaireRef: PropTypes.func.isRequired,
  dragComponent: PropTypes.func.isRequired,
  duplicateComponentAndVariables: PropTypes.func.isRequired,
  duplicateQuestionnaire: PropTypes.func.isRequired,
  removeQuestionnaire: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  activeCalculatedVariables: PropTypes.object,
  calculatedVariables: PropTypes.object,
};

QuestionnaireListComponents.defaultProps = {
  token: '',
  componentsStore: {},
  errorsIntegrity: {},
  activeCalculatedVariables: {},
  calculatedVariables: {},
};

const ForwardedQuestionnaireListComponents = withForwardRef(
  QuestionnaireListComponents,
);

const WrappedQuestionnaireListComponents = DragDropContext(HTML5Backend)(
  ForwardedQuestionnaireListComponents,
);

export default WrappedQuestionnaireListComponents;
