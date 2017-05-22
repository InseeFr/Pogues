import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import QuestionnaireElement from 'components/questionnaire/questionnaire-element';
import QuestionnaireEditContainer from 'containers/questionnaire/questionnaire-edit';

class Questionnaire extends Component {
  static propTypes = {
    locale: PropTypes.object.isRequired,
    questionnaire: PropTypes.object.isRequired,
    elements: PropTypes.object,
  };
  static defaultProps = {
    elements: {},
  };
  constructor() {
    super();

    this.state = {
      selectedElementId: undefined,
      showQuestionnaireModal: false,
      showElementModal: false,
      idElementInModal: undefined,
    };

    this.handleElementSelect = this.handleElementSelect.bind(this);
    this.handleOpenElementDetail = this.handleOpenElementDetail.bind(this);
    this.handleCloseElementDetail = this.handleCloseElementDetail.bind(this);
    this.handleOpenQuestionnaireDetail = this.handleOpenQuestionnaireDetail.bind(this);
    this.handleCloseQuestionnaireDetail = this.handleCloseQuestionnaireDetail.bind(this);
    this.renderElementsByParent = this.renderElementsByParent.bind(this);
    this.handleQuestionnnarieUpdated = this.handleQuestionnnarieUpdated.bind(this);
  }

  handleElementSelect(event, idElement) {
    event.stopPropagation();
    if (!idElement) return;
    const newSelected = idElement !== this.state.selectedElementId ? idElement : undefined;
    const newState = { ...this.state, selectedElementId: newSelected };
    this.setState(newState);
  }

  handleOpenElementDetail(event, idElement) {
    event.stopPropagation();
    if (!idElement) return;
    const newState = {
      ...this.state,
      showElementModal: true,
      idElementInModal: idElement,
    };
    this.setState(newState);
  }

  handleCloseElementDetail() {
    const newState = {
      ...this.state,
      showElementModal: false,
      idElementInModal: undefined,
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

  renderElementsByParent(elements, parent) {
    parent = parent || '';
    const renderElementsByParent = this.renderElementsByParent;
    const selected = this.state.selectedElementId;

    return Object.keys(elements).filter(key => elements[key].parent === parent).map(key => {
      const subTree = renderElementsByParent(elements, key);
      const isSelected = key === selected;
      return (
        <QuestionnaireElement
          key={key}
          id={key}
          name={elements[key].name}
          type={elements[key].type}
          label={elements[key].label}
          selected={isSelected}
          onClickElement={event => this.handleElementSelect(event, key)}
          onClickDetail={event => this.handleOpenElementDetail(event, key)}
        >
          {subTree}
        </QuestionnaireElement>
      );
    }, {});
  }

  render() {
    const { locale, elements, questionnaire } = this.props;
    const tree = this.renderElementsByParent(elements);
    let typeLocaleCurrentElement;
    let labelElementModal = '';
    if (elements && this.state.idElementInModal) {
      switch (elements[this.state.idElementInModal].type) {
        case 'SEQUENCE':
          typeLocaleCurrentElement = locale.sequence;
          break;
        case 'QUESTION':
          typeLocaleCurrentElement = locale.question;
          break;
        default:
          typeLocaleCurrentElement = '';
          break;
      }

      labelElementModal = `${typeLocaleCurrentElement} ${elements[this.state.idElementInModal].name}`;
    }

    return (
      <div id="questionnaire">
        <div id="questionnaire-head">
          <h4>{questionnaire.label}</h4>
          <div>
            <button className="btn-yellow" onClick={this.handleOpenQuestionnaireDetail}>{locale.showDetail}</button>
          </div>
        </div>
        <div id="questionnaire-items">
          {tree}
        </div>
        <ReactModal
          isOpen={this.state.showQuestionnaireModal}
          onRequestClose={this.handleCloseQuestionnaireDetail}
          contentLabel={locale.questionnaireDetail}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>{locale.questionnaireDetail}</h3>
              <button onClick={this.handleCloseQuestionnaireDetail}><span>X</span></button>
            </div>
            <div className="popup-body">
              <QuestionnaireEditContainer
                id={questionnaire.id}
                onCancel={this.handleCloseQuestionnaireDetail}
                onSuccess={this.handleQuestionnnarieUpdated}
              />
            </div>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={this.state.showElementModal}
          onRequestClose={this.handleCloseElementDetail}
          contentLabel={labelElementModal}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>{labelElementModal}</h3>
              <button onClick={this.handleCloseElementDetail}><span>X</span></button>
            </div>
            <div className="popup-body">
              {labelElementModal}
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Questionnaire;
