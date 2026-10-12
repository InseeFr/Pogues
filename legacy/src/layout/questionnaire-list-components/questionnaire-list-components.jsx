import { forwardRef, useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactModal from 'react-modal';

import { AuthContext } from '@/auth/context';

import { domSelectorForModal } from '../../constants/dom-constants';
import { COMPONENT_TYPE } from '../../constants/pogues-constants';
import { useReadonly } from '../../hooks/useReadonly';
import { getSortedChildren } from '../../utils/component/component-utils';
import Dictionary from '../../utils/dictionary/dictionary';
import { ComponentEdit } from '../component-edit';
import Loader from '../loader';
import { ConfirmDialog } from './components/confirm-dialog';
import { ErrorsIntegrity as ErrorsIntegrityPanel } from './components/errors-integrity';
import QuestionnaireComponent from './questionnaire-component';

const { LOOP, FILTER, NESTEDFILTRE } = COMPONENT_TYPE;

function withForwardRef(Component) {
  const WrappedComponent = (props, ref) => {
    return <Component {...props} forwardedRef={ref} />;
  };

  return forwardRef(WrappedComponent);
}

const QuestionnaireListComponents = (rawProps) => {
  const {
    duplicateQuestionnaire,
    isQuestionnaireModified,
    forwardedRef,
    questionnaire,
    componentsStore = {},
    editingComponentId,
    errorsIntegrity = {},
    setSelectedComponentId,
    removeQuestionnaire,
    navigate,
  } = rawProps;
  const props = {
    ...rawProps,
    componentsStore,
    errorsIntegrity,
  };

  const isReadonly = useReadonly();

  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    setSelectedComponentId('');
  }, [setSelectedComponentId]);

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [showRemoveQuestionnaireDialog, setShowRemoveQuestionnaireDialog] =
    useState(false);

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
    <DndProvider backend={HTML5Backend}>
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
                  disabled={isQuestionnaireModified}
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
              closePopup={() => setShowDuplicateModal(false)}
              confirm={() =>
                getAccessToken().then((accessToken) =>
                  duplicateQuestionnaire(questionnaire.id, accessToken).then(
                    () => setShowDuplicateModal(false),
                  ),
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
                getAccessToken().then((accessToken) =>
                  removeQuestionnaire(questionnaire.id, accessToken).then(() =>
                    navigate('/'),
                  ),
                )
              }
              title={Dictionary.confirmBodyTitle}
              message={Dictionary.confirmBodyMessage}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

// Prop types and default Props
QuestionnaireListComponents.propTypes = {
  token: PropTypes.string,
  isQuestionnaireModified: PropTypes.bool.isRequired,
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
};

const ForwardedQuestionnaireListComponents = withForwardRef(
  QuestionnaireListComponents,
);

export default ForwardedQuestionnaireListComponents;
