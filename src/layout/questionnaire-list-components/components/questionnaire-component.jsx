import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ClassSet from 'react-classset';
import { compose } from 'redux';

import DropZone from './drop-zone/drop-zone';

import { QUESTIONNAIRE_COMPONENT } from 'constants/dom-constants';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

import { VisualizeDropdown } from 'widgets/visualize-dropdown';
import { markdownVtlToString } from 'forms/controls/rich-textarea';

import {
  PropType,
  componentSource,
  cardTarget,
  collect,
} from 'utils/component/component-dragndrop';
import {
  getDragnDropLevel,
  calculateMargin,
} from 'utils/component/component-dragndrop-utils';
import Dictionary from 'utils/dictionary/dictionary';
import { getIntegrityErrors } from 'utils/integrity/utils';

const { COMPONENT_CLASS } = QUESTIONNAIRE_COMPONENT;
const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

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
    visualizeActiveQuestionnaire,
    handleRemovePageBreak,
    componentFilters,
  } = props;

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  const ensureSelected = () => {
    executeScroll();
  };

  useEffect(() => {
    if (selected) {
      ensureSelected();
    }
  }, [selected]);

  const handleSelectComponent = () => {
    props.setSelectedComponentId(component.id);
  };

  const handleEditComponent = () => {
    props.setEditingComponentId(component.id);
    props.actions.handleOpenComponentDetail();
  };
  const handleEditFilterComponent = id => {
    console.log('id', id);
    props.setEditingComponentId(id);
    //props.actions.handleOpenComponentDetail();
  };

  const handleDuplicateComponent = () => {
    props.duplicateComponentAndVariables(component.id);
  };

  const handleDeleteComponent = () => {
    props.removeComponent(component.id);
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
          })}
          ref={myRef}
        >
          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
          <div
            role="presentation"
            onClick={handleSelectComponent}
            className={ClassSet({
              'questionnaire-element-info': true,
              over: isOver,
            })}
          >
            <div className="questionnaire-element-name">{component.name}</div>
            <div className="questionnaire-element-body">
              <div>
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
                {componentFilters.length > 0
                  ? componentFilters.map(filter => {
                      return (
                        <div className="questionnaire-element-filter">
                          <button
                            className="btn-white"
                            onClick={handleEditFilterComponent(filter.id)}
                          >
                            {filter.name}
                          </button>
                        </div>
                      );
                    })
                  : false}

                {selected ? (
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
                      visualizeActiveQuestionnaire={
                        visualizeActiveQuestionnaire
                      }
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
                ) : (
                  ''
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
          {component.pageBreak && component.type !== QUESTION && (
            <div className="separator">
              <hr />
              <button onClick={handleRemovePageBreak}>x</button>
            </div>
          )}
          {dropZone}
          {children}
        </div>
        {component.pageBreak && component.type === QUESTION && (
          <div className="separator">
            <hr />
            <button onClick={handleRemovePageBreak}>x</button>
          </div>
        )}
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
  visualizeActiveQuestionnaire: PropTypes.func.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
  setEditingComponentId: PropTypes.func.isRequired,
  duplicateComponentAndVariables: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
  moveComponent: PropTypes.func.isRequired,
  handleRemovePageBreak: PropTypes.func.isRequired,

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
