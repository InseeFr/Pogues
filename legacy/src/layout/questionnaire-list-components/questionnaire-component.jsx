import { useCallback, useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import ClassSet from 'react-classset';
import { useDrag, useDrop } from 'react-dnd';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

import { domSelectorForModal } from '../../constants/dom-constants';
import { COMPONENT_TYPE } from '../../constants/pogues-constants';
import { markdownVtlToString } from '../../forms/controls/rich-textarea';
import { useReadonly } from '../../hooks/useReadonly';
import { PropType } from '../../utils/component/component-dragndrop';
import {
  calculateMargin,
  getDragnDropLevel,
} from '../../utils/component/component-dragndrop-utils';
import Dictionary from '../../utils/dictionary/dictionary';
import { getIntegrityErrors } from '../../utils/integrity/utils';
import { VisualizeDropdown } from '../../widgets/visualize-dropdown';
import { ComponentEdit } from '../component-edit';
import { DropZone } from './components/drop-zone';

const {
  QUESTION,
  SEQUENCE,
  SUBSEQUENCE,
  FILTER,
  EXTERNAL_ELEMENT,
  ROUNDABOUT,
} = COMPONENT_TYPE;

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const QuestionnaireComponent = (props) => {
  const {
    component,
    integrityErrorsByType,
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
    moveComponent,
  } = props;

  const [showComponentModal, setShowComponentModal] = useState(false);

  const myRef = useRef(null);

  const isReadonly = useReadonly();

  const [{ isOver, draggedItem, canDrop }, drop] = useDrop({
    accept: PropType,
    canDrop: (item) => {
      return (
        component.parent !== item.id &&
        item.children.indexOf(component.parent) < 0
      );
    },
    drop: (item, monitor) => {
      if (monitor.isOver({ shallow: false })) {
        moveComponent(component.id, item.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      draggedItem: monitor.getItem(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [, drag] = useDrag({
    type: PropType,
    item: {
      id: component.id,
      type: component.type,
      parent: component.parent,
      children: component.children,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

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
  const handleEditFilterComponent = (id) => {
    setEditingComponentId(id);
    setShowComponentModal(true);
  };

  const handleCloseComponentDetail = () => setShowComponentModal(false);
  const handleDuplicateComponent = () =>
    duplicateComponentAndVariables(component.id);
  const handleDeleteComponent = (event) => {
    event.preventDefault();
    event.stopPropagation();
    removeComponent(component.id);
  };
  const handleDeleteQuestionnaireRef = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const deletedComponent = component.id;
    removeQuestionnaireRef(deletedComponent);
    removeComponent(deletedComponent);
  };

  const handleDeleteComponent1 = (id) => {
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

  return (
    <div
      className="questionnaire-component"
      ref={isReadonly ? undefined : (node) => drag(drop(node))}
    >
      <div
          className={ClassSet({
            'questionnaire-element': true,
            selected: selected,
            'questionnaire-sequence': component.type === SEQUENCE,
            'questionnaire-subsequence': component.type === SUBSEQUENCE,
            'questionnaire-question': component.type === QUESTION,
            'questionnaire-external-element':
              component.type === EXTERNAL_ELEMENT,
            'questionnaire-roundabout': component.type === ROUNDABOUT,
          })}
          ref={myRef}
        >
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
                  componentFiltersInitial.map((filter) => {
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
                  componentFiltersFinal.map((filter) => {
                    return (
                      <div
                        key={`${filter.id}-endif`}
                        className="questionnaire-element-filter"
                      >
                        <button
                          disabled={isReadonly}
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
                      disabled={isReadonly}
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
                        disabled={isReadonly}
                        className="btn-yellow"
                        onClick={handleDuplicateComponent}
                      >
                        {Dictionary.duplicate}
                        <span className="glyphicon glyphicon-duplicate" />
                      </button>
                    )}
                    <VisualizeDropdown componentId={component.id} />
                    <button
                      className="btn-yellow"
                      disabled={
                        isReadonly ||
                        (component.weight === 0 && component.type === SEQUENCE)
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
          parentSelector={domSelectorForModal}
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
                deleteComponent={(id) => handleDeleteComponent1(id)}
              />
            </div>
          </div>
        </ReactModal>
      </div>
  );
};

QuestionnaireComponent.propTypes = {
  component: PropTypes.object.isRequired,
  integrityErrorsByType: PropTypes.object,
  setSelectedComponentId: PropTypes.func.isRequired,
  setEditingComponentId: PropTypes.func.isRequired,
  duplicateComponentAndVariables: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
  moveComponent: PropTypes.func.isRequired,
  removeQuestionnaireRef: PropTypes.func.isRequired,
  children: PropTypes.array,
  selected: PropTypes.bool.isRequired,
  parentType: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    handleOpenComponentDetail: PropTypes.func.isRequired,
  }).isRequired,
};

QuestionnaireComponent.defaultProps = {
  children: [],
  integrityErrorsByType: {},
};

export default QuestionnaireComponent;
