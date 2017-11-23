import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ClassSet from 'react-classset';

import DropZone from './drop-zone/drop-zone';

import { QUESTIONNAIRE_COMPONENT } from 'constants/dom-constants';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

import { VisualizeDropdown } from 'widgets/visualize-dropdown';
import { markdownVtlToHtml } from 'forms/controls/rich-textarea';

import { PropType, componentSource, cardTarget, collect } from 'utils/component/component-dragndrop';
import { getDragnDropLevel, calculateMargin } from 'utils/component/component-dragndrop-utils';
import Dictionary from 'utils/dictionary/dictionary';
import { getIntegrityErrors } from 'utils/integrity/utils';

const { COMPONENT_CLASS } = QUESTIONNAIRE_COMPONENT;
const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

// Prop types and default props

// @TODO: Maybe it's not an
const propTypes = {
  component: PropTypes.object.isRequired,
  integrityErrorsByType: PropTypes.object,
  draggedItem: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  visualizeActiveQuestionnaire: PropTypes.func.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
  setEditingComponentId: PropTypes.func.isRequired,
  duplicateComponent: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
  children: PropTypes.array,
  selected: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
  parentType: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    handleOpenComponentDetail: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  children: [],
  draggedItem: {},
  integrityErrorsByType: {},
  canDrop: true,
};

// Component

@DropTarget(PropType, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true }),
  draggedItem: monitor.getItem(),
  canDrop: monitor.canDrop(),
}))
@DragSource(PropType, componentSource, collect)
class QuestionnaireComponent extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.handleSelectComponent = this.handleSelectComponent.bind(this);
    this.handleEditComponent = this.handleEditComponent.bind(this);
    this.handleDuplicateComponent = this.handleDuplicateComponent.bind(this);
    this.handleDeleteComponent = this.handleDeleteComponent.bind(this);
  }

  componentDidMount() {
    this.ensureSelected();
  }

  componentDidUpdate() {
    this.ensureSelected();
  }

  ensureSelected() {
    if (this.props.selected) {
      this.node.scrollIntoView();
    }
  }

  handleSelectComponent() {
    this.props.setSelectedComponentId(this.props.component.id);
  }

  handleEditComponent() {
    this.props.setEditingComponentId(this.props.component.id);
    this.props.actions.handleOpenComponentDetail();
  }

  handleDuplicateComponent() {
    this.props.duplicateComponent(this.props.component.id);
  }

  handleDeleteComponent() {
    this.props.removeComponent(this.props.component.id);
  }

  render() {
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
    } = this.props;
    const dragndropLevel = getDragnDropLevel(this.props, draggedItem);
    const style = {
      marginLeft: `${calculateMargin(this.props, draggedItem, dragndropLevel, parentType)}px`,
    };
    const dropZone = canDrop && isOver && <DropZone style={style} />;
    const integrityErrors = getIntegrityErrors(integrityErrorsByType);

    /**
     * If a component is dragged, and if the current component can receive this component, we will add
     * a drop zone.
     */
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
            ref={node => {
              this.node = node;
            }}
          >
            {/* eslint-disable jsx-a11y/no-static-element-interactions */}
            <div
              tabIndex="0"
              onClick={this.handleSelectComponent}
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
                          __html: markdownVtlToHtml(component.label),
                        }}
                      />
                    ) : (
                      component.label
                    )}
                  </div>
                  {selected ? (
                    <div className="questionnaire-element-actions">
                      <button className="btn-yellow" onClick={this.handleEditComponent}>
                        {Dictionary.showDetail}
                      </button>
                      {component.type === 'QUESTION' && (
                        <button className="btn-yellow" onClick={this.handleDuplicateComponent}>
                          {Dictionary.duplicate}
                          <span className="glyphicon glyphicon-duplicate" />
                        </button>
                      )}
                      <VisualizeDropdown
                        componentId={component.id}
                        visualizeActiveQuestionnaire={visualizeActiveQuestionnaire}
                      />
                      <button
                        className="btn-yellow"
                        disabled={component.weight === 0 && component.type === 'SEQUENCE'}
                        onClick={this.handleDeleteComponent}
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
                    <ul>{integrityErrors.map(e => <li key={e}>{e}</li>)}</ul>
                  </div>
                )}
              </div>
            </div>
            {dropZone}
            {children}
          </div>
        </div>
      )
    );
  }
}

export default QuestionnaireComponent;
