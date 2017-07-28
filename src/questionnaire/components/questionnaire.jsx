import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import QuestionnaireElement from '../components/questionnaire-element';
import QuestionnaireEditContainer from '../containers/questionnaire-edit';
import ComponentEditContainer from '../containers/component/component-edit';
import Dictionary from 'utils/dictionary/dictionary';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
class Questionnaire extends Component {
  static propTypes = {
    questionnaire: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    selectedComponentId: PropTypes.string.isRequired,
    removeComponent: PropTypes.func.isRequired,
    setSelectedComponentId: PropTypes.func.isRequired,
    moveComponent: PropTypes.func.isRequired,
    duplicateComponent: PropTypes.func.isRequired,
  };
  constructor() {
    super();

    this.state = {
      showQuestionnaireModal: false,
      showElementModal: false,
      idElementInModal: undefined,
      typeElementInModal: undefined,
    };

    this.handleElementSelect = this.handleElementSelect.bind(this);
    this.handleElementDelete = this.handleRemoveElement.bind(this);
    this.handleOpenElementDetail = this.handleOpenElementDetail.bind(this);
    this.handleCloseElementDetail = this.handleCloseElementDetail.bind(this);
    this.handleOpenQuestionnaireDetail = this.handleOpenQuestionnaireDetail.bind(this);
    this.handleCloseQuestionnaireDetail = this.handleCloseQuestionnaireDetail.bind(this);
    this.renderComponentsByParent = this.renderComponentsByParent.bind(this);
    this.handleQuestionnnarieUpdated = this.handleQuestionnnarieUpdated.bind(this);
    this.handleDuplicateElement = this.handleDuplicateElement.bind(this);
  }

  handleElementSelect(event, idElement) {
    if (event !== null) event.stopPropagation();
    if (!idElement) return;
    // Toggle the selection
    const newSelected = idElement !== this.props.selectedComponentId ? idElement : '';
    this.props.setSelectedComponentId(newSelected);
  }

  handleRemoveElement(event, idElement) {
    event.stopPropagation();
    if (!idElement) return;
    this.props.removeComponent(idElement);
  }

  handleDuplicateElement(event, idElement){
    event.stopPropagation();
    if (!idElement) return;
    this.props.duplicateComponent(idElement);
  }

  handleOpenElementDetail(event, idElement) {
    event.stopPropagation();
    if (!idElement) return;
    const newState = {
      ...this.state,
      showElementModal: true,
      idElementInModal: idElement,
      typeElementInModal: this.props.components[idElement].type,
    };
    this.setState(newState);
  }

  handleCloseElementDetail() {
    const newState = {
      ...this.state,
      showElementModal: false,
      idElementInModal: undefined,
      typeElementInModal: undefined,
    };
    this.setState(newState);
  }

  handleOpenQuestionnaireDetail() {
    const newState = {
      ...this.state,
      showQuestionnaireModal: true,
    };
    this.setState(newState);
  }

  handleCloseQuestionnaireDetail() {
    const newState = {
      ...this.state,
      showQuestionnaireModal: false,
    };
    this.setState(newState);
  }

  handleQuestionnnarieUpdated() {
    this.handleCloseQuestionnaireDetail();
  }

  renderComponentsByParent(components, parent) {
    const renderComponentsByParent = this.renderComponentsByParent;
    const selected = this.props.selectedComponentId;
    const { moveComponent } = this.props;
    return Object.keys(components)
      .filter(key => components[key].parent === parent)
      .sort((key, nextKey) => {
        if (components[key].weight < components[nextKey].weight) return -1;
        if (components[key].weight > components[nextKey].weight) return 1;
        return 0;
      })
      .map(key => {
        const subTree = renderComponentsByParent(components, key);
        const isSelected = key === selected;
        return (
          <QuestionnaireElement
            key={key}
            id={key}
            parent={components[key].parent}
            parentType={components[components[key].parent].type}
            name={components[key].name}
            type={components[key].type}
            label={components[key].label}
            selected={isSelected}
            onClickElement={this.handleElementSelect}
            onClickDetail={event => this.handleOpenElementDetail(event, key)}
            onClickDelete={event => this.handleRemoveElement(event, key)}
            onClickDuplicate={event => this.handleDuplicateElement(event, key)}
            moveComponent={moveComponent}
            childrenId={components[key].children}
            weight={components[key].weight}
          >
            {subTree}
          </QuestionnaireElement>
        );
      }, {});
  }

  render() {
    const { components, questionnaire } = this.props;
    const tree = this.renderComponentsByParent(components, questionnaire.id);
    const typeElementInModal = this.state.typeElementInModal;

    return (
      <div id="questionnaire">
        <div id="questionnaire-head">
          <h4>{questionnaire.label}</h4>
          <div>
            <button className="btn-yellow" onClick={this.handleOpenQuestionnaireDetail}>{Dictionary.showDetail}</button>
          </div>
        </div>
        <div id="questionnaire-items">
          {tree}
        </div>
        <ReactModal
          shouldCloseOnOverlayClick={false}
          isOpen={this.state.showQuestionnaireModal}
          onRequestClose={this.handleCloseQuestionnaireDetail}
          contentLabel={Dictionary.questionnaireDetail}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>{Dictionary.questionnaireDetail}</h3>
              <button onClick={this.handleCloseQuestionnaireDetail}><span>X</span></button>
            </div>
            <div className="popup-body">
              <QuestionnaireEditContainer
                onCancel={this.handleCloseQuestionnaireDetail}
                onSuccess={this.handleQuestionnnarieUpdated}
              />
            </div>
          </div>
        </ReactModal>
        <ReactModal
          shouldCloseOnOverlayClick={false}
          isOpen={this.state.showElementModal}
          onRequestClose={this.handleCloseElementDetail}
          contentLabel={typeElementInModal ? Dictionary[`componentEdit${typeElementInModal}`] : ''}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>
                {typeElementInModal ? Dictionary[`componentEdit${typeElementInModal}`] : ''}
              </h3>
              <button onClick={this.handleCloseElementDetail}><span>X</span></button>
            </div>
            <div className="popup-body">
              <ComponentEditContainer
                questionnaireId={questionnaire.id}
                componentId={this.state.idElementInModal}
                onCancel={this.handleCloseElementDetail}
                onSuccess={this.handleCloseElementDetail}
              />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Questionnaire;
