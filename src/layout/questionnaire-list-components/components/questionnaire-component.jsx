import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import ClassSet from 'react-classset';
import { DragSource, DropTarget } from 'react-dnd';
import { Link } from 'react-router-dom';
import { compose } from 'redux';

import DropZone from './drop-zone/drop-zone';

import { QUESTIONNAIRE_COMPONENT } from '../../../constants/dom-constants';
import { COMPONENT_TYPE } from '../../../constants/pogues-constants';

import ReactModal from 'react-modal';
import { markdownVtlToString } from '../../../forms/controls/rich-textarea';
import { VisualizeDropdown } from '../../../widgets/visualize-dropdown';
import { ComponentEdit } from '../../component-edit';

import {
  PropType,
  cardTarget,
  collect,
  componentSource,
} from '../../../utils/component/component-dragndrop';
import {
  calculateMargin,
  getDragnDropLevel,
} from '../../../utils/component/component-dragndrop-utils';
import Dictionary from '../../../utils/dictionary/dictionary';
import { getIntegrityErrors } from '../../../utils/integrity/utils';
import { useOidc } from '../../../utils/oidc';

const { COMPONENT_CLASS } = QUESTIONNAIRE_COMPONENT;
const { QUESTION, SEQUENCE, SUBSEQUENCE, FILTER, EXTERNAL_ELEMENT } =
  COMPONENT_TYPE;

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

const QuestionnaireComponent = props => {
  const {
    component,
    connectDragSource,
    integrityErrorsByType,
    connectDropTarget,
    draggedItem,
    canDrop,
    isOver,
    selected,
    children,
    parentType,
    componentFiltersInitial,
    componentFiltersFinal,
    setSelectedComponentId,
    setEditingComponentId,
    actions,
    duplicateComponentAndVariables,
    removeComponent,
    removeQuestionnaireRef,
  } = props;

  const oidc = useOidc();
  const token = oidc.oidcTokens.accessToken;

  const [showComponentModal, setShowComponentModal] = useState(false);

  const myRef = useRef(null);

  const ensureSelected = useCallback(() => {
    scrollToRef(myRef);
  }, []);

  useEffect(() => {
    if (selected) {
      ensureSelected();
    }
  }, [selected, ensureSelected]);

  const handleEditComponent = () => {
    setEditingComponentId(component.id);
    actions.handleOpenComponentDetail();
  };
  const handleEditFilterComponent = id => {
    setEditingComponentId(id);
    setShowComponentModal(true);
  };

  const handleCloseComponentDetail = () => setShowComponentModal(false);
  const handleDuplicateComponent = () =>
    duplicateComponentAndVariables(component.id);
  const handleDeleteComponent = event => {
    event.preventDefault();
    event.stopPropagation();
    removeComponent(component.id);
  };
  const handleDeleteQuestionnaireRef = event => {
    event.preventDefault();
    event.stopPropagation();
    const deletedComponent = component.id;
    removeQuestionnaireRef(deletedComponent);
    removeComponent(deletedComponent);
  };

  const handleDeleteComponent1 = id => {
    removeComponent(id);
    setShowComponentModal(false);
  };

  const dragndropLevel = getDragnDropLevel(props, draggedItem);
  const style = {
    marginLeft: `${calculateMargin(
      props,
      draggedItem,
      dragndropLevel,
      parentType,
    )}px`,
  };
  const dropZone = canDrop && isOver && <DropZone style={style} />;
  const integrityErrors = getIntegrityErrors(integrityErrorsByType);
  const componentHeader = Dictionary[`componentEdit${FILTER}`] || '';
  return connectDragSource(
    connectDropTarget(
      <div className={COMPONENT_CLASS}>
        <div
          className={ClassSet({
            'questionnaire-element': true,
            selected: selected,
            'questionnaire-sequence': component.type === SEQUENCE,
            'questionnaire-subsequence': component.type === SUBSEQUENCE,
            'questionnaire-question': component.type === QUESTION,
            'questionnaire-external-element':
              component.type === EXTERNAL_ELEMENT,
          })}
          ref={myRef}
        >
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <div
            role="presentation"
            onClick={() => setSelectedComponentId(component.id)}
            className={ClassSet({
              'questionnaire-element-info': true,
              over: isOver,
              'question-filter':
                component.type === QUESTION &&
                (componentFiltersInitial?.length > 0 ||
                  componentFiltersFinal?.length > 0),
            })}
          >
            <div className="questionnaire-element-name">{component.name}</div>
            <div className="questionnaire-element-body">
              <div className="questionnaire-elements">
                <div className="questionnaire-element-label">
                  {component.type === QUESTION ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: markdownVtlToString(component.label),
                      }}
                    />
                  ) : (
                    component.label
                  )}
                </div>
                {componentFiltersInitial?.length > 0 &&
                  componentFiltersInitial.map(filter => {
                    return (
                      <div
                        key={`${filter.id}-if`}
                        className="questionnaire-element-filter"
                      >
                        <button
                          onClick={() => handleEditFilterComponent(filter.id)}
                          className="btn-white-filter"
                        >
                          {`${Dictionary.If} ${filter?.filter}`}
                        </button>
                      </div>
                    );
                  })}
                {componentFiltersFinal?.length > 0 &&
                  componentFiltersFinal.map(filter => {
                    return (
                      <div
                        key={`${filter.id}-endif`}
                        className="questionnaire-element-filter"
                      >
                        <button
                          onClick={() => handleEditFilterComponent(filter.id)}
                          className="btn-white-filter"
                        >
                          {`${Dictionary.EndIf} ${filter?.filter}`}
                        </button>
                      </div>
                    );
                  })}
                {selected && component.type === EXTERNAL_ELEMENT && (
                  <div className="questionnaire-element-actions">
                    <Link
                      className="btn-yellow"
                      to={`/questionnaire/${component.id}`}
                      target="_blank"
                    >
                      {Dictionary.openQuestionnaire}
                    </Link>
                    <button
                      className="btn-yellow"
                      onClick={handleDeleteQuestionnaireRef}
                    >
                      {Dictionary.remove}
                      <span className="glyphicon glyphicon-trash" />
                    </button>
                  </div>
                )}
                {selected && component.type !== EXTERNAL_ELEMENT && (
                  <div className="questionnaire-element-actions">
                    <button
                      className="btn-yellow"
                      onClick={handleEditComponent}
                    >
                      {Dictionary.showDetail}
                    </button>
                    {component.type === QUESTION && (
                      <button
                        className="btn-yellow"
                        onClick={handleDuplicateComponent}
                      >
                        {Dictionary.duplicate}
                        <span className="glyphicon glyphicon-duplicate" />
                      </button>
                    )}
                    <VisualizeDropdown
                      componentId={component.id}
                      token={token}
                    />
                    <button
                      className="btn-yellow"
                      disabled={
                        component.weight === 0 && component.type === SEQUENCE
                      }
                      onClick={handleDeleteComponent}
                    >
                      {Dictionary.remove}
                      <span className="glyphicon glyphicon-trash" />
                    </button>
                  </div>
                )}
              </div>
              {integrityErrors.length > 0 && (
                <div className="questionnaire-element-errors">
                  <ul>
                    {integrityErrors.map((e, index) => (
                      <li key={index}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {dropZone}
          {children}
        </div>
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
              <button type="button" onClick={handleCloseComponentDetail}>
                <span>X</span>
              </button>
            </div>
            <div className="popup-body">
              <ComponentEdit
                onCancel={handleCloseComponentDetail}
                onSuccess={handleCloseComponentDetail}
                deleteComponent={id => handleDeleteComponent1(id)}
              />
            </div>
          </div>
        </ReactModal>
      </div>,
    ),
  );
};

QuestionnaireComponent.propTypes = {
  component: PropTypes.object.isRequired,
  integrityErrorsByType: PropTypes.object,
  draggedItem: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
  setEditingComponentId: PropTypes.func.isRequired,
  duplicateComponentAndVariables: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
  moveComponent: PropTypes.func.isRequired,
  removeQuestionnaireRef: PropTypes.func.isRequired,
  children: PropTypes.array,
  selected: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
  parentType: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    handleOpenComponentDetail: PropTypes.func.isRequired,
  }).isRequired,
};

QuestionnaireComponent.defaultProps = {
  children: [],
  draggedItem: {},
  integrityErrorsByType: {},
  canDrop: true,
};

export default compose(
  DropTarget(PropType, cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    draggedItem: monitor.getItem(),
    canDrop: monitor.canDrop(),
  })),
  DragSource(PropType, componentSource, collect),
)(QuestionnaireComponent);
