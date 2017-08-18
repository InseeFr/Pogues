import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassSet from 'react-classset';

import Dictionary from 'utils/dictionary/dictionary';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import DropZone from 'questionnaire/components/drop-zone/drop-zone';

import { DragSource, DropTarget } from 'react-dnd';
import { PropType, componentSource, cardTarget, collect } from 'utils/component/component-dragndrop';
import { getDragnDropLevel, calculateMargin } from 'utils/component/component-dragndrop-utils';
import { markdownToHtml } from 'layout/forms/controls/rich-textarea';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

@DropTarget(PropType, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true }),
  draggedItem: monitor.getItem(),
  canDrop: monitor.canDrop(),
}))
@DragSource(PropType, componentSource, collect)
class QuestionnaireElement extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    parentType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.object),
    childrenId: PropTypes.arrayOf(PropTypes.string),
    onClickElement: PropTypes.func.isRequired,
    onClickDetail: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired,
    onClickDuplicate: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    moveComponent: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    draggedItem: PropTypes.object,
    canDrop: PropTypes.bool,
    errors: PropTypes.array,
  };
  static defaultProps = {
    children: [],
    errors: [],
  };
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

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isOver,
      name,
      id,
      type,
      label,
      htmlLabel,
      selected,
      children,
      weight,
      childrenId,
      onClickElement,
      onClickDetail,
      onClickDelete,
      onClickDuplicate,
      parentType,
      parent,
      draggedItem,
      canDrop,
      errors,
    } = this.props;

    const dragndropLevel = getDragnDropLevel(this.props, draggedItem);
    const style = {
      marginLeft: `${calculateMargin(this.props, draggedItem, dragndropLevel, parentType)}px`,
    };
    const listErrors = errors.map((e, index) => {
      return (
        <li key={`${e.code}-${id}-${index}`}>
          <div className="alert-icon small">
            <div className="alert-triangle" />!
          </div>
          {Dictionary[e.dictionary]}
        </li>
      );
    });

    /**
     * If a component is dragged, and if the current component can receive this component, we will add
     * a drop zone.
     */
    const dropZone = canDrop && isOver && <DropZone style={style} />;

    return connectDragSource(
      connectDropTarget(
        <div>
          <div
            className={ClassSet({
              'questionnaire-element': true,
              selected: selected,
              'questionnaire-sequence': type === SEQUENCE,
              'questionnaire-subsequence': type === SUBSEQUENCE,
              'questionnaire-question': type === QUESTION,
            })}
            ref={node => (this.node = node)}
          >
            {/* eslint-disable jsx-a11y/no-static-element-interactions */}
            <div
              tabIndex="0"
              onClick={event => onClickElement(event, id)}
              className={ClassSet({
                'questionnaire-element-info': true,
                over: isOver,
              })}
            >
              <div className="questionnaire-element-name">
                {name}
              </div>
              <div className="questionnaire-element-body">
                <div>
                  <div className="questionnaire-element-label">
                    {type === QUESTION ? <span dangerouslySetInnerHTML={htmlLabel} /> : label}
                  </div>
                  {selected
                    ? <div className="questionnaire-element-actions">
                        <button className="btn-yellow" onClick={onClickDetail}>
                          {Dictionary.showDetail}
                        </button>
                        {type === 'QUESTION' &&
                          <button className="btn-yellow" onClick={onClickDuplicate}>
                            {Dictionary.duplicate}
                            <span className="glyphicon glyphicon-duplicate" />
                          </button>}
                        <button
                          className="btn-yellow"
                          disabled={weight === 0 && type === 'SEQUENCE'}
                          onClick={onClickDelete}
                        >
                          {Dictionary.remove}
                          <span className="glyphicon glyphicon-trash" />
                        </button>
                      </div>
                    : ''}
                </div>
                {listErrors.length > 0 &&
                  <div className="questionnaire-element-errors">
                    <ul>
                      {listErrors}
                    </ul>
                  </div>}
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

export default QuestionnaireElement;
