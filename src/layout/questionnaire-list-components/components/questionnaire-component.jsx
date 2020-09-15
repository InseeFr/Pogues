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
import { ComponentEdit } from 'layout/component-edit';
import ReactModal from 'react-modal';

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
const { QUESTION, SEQUENCE, SUBSEQUENCE, FILTER } = COMPONENT_TYPE;

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

  const [showComponentModal, setShowComponentModal] = useState(false);

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
    props.setEditingComponentId(id);
    handleOpenComponentDetail();
  };

  const handleCloseComponentDetail = () => {
    setShowComponentModal(false);
  };

  const handleDuplicateComponent = () => {
    props.duplicateComponentAndVariables(component.id);
  };

  const handleDeleteComponent = () => {
    props.removeComponent(component.id);
  };
  const handleDeleteComponent1 = id => {
    props.removeComponent(id);
    setShowComponentModal(false);
  };
  const handleOpenComponentDetail = () => {
    setShowComponentModal(true);
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
                {componentFilters?.length > 0
                  ? componentFilters.map(filter => {
                      return (
                        <div className="questionnaire-element-filter">
                          <button
                            onClick={() => handleEditFilterComponent(filter.id)}
                            className="btn-white-filter"
                          >
                            {filter?.filter}
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
