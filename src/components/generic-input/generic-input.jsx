import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { COMPONENT_TYPE } from 'constants/pogues-constants';
import ComponentNewContainer from 'containers/component/component-new';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

class GenericInput extends Component {
  static propTypes = {
    locale: PropTypes.object.isRequired,
    questionnaireId: PropTypes.string,
  };
  static defaultProps = {
    questionnaireId: undefined,
  };
  constructor(props) {
    super(props);

    this.state = {
      showNewComponentModal: false,
      typeNewComponent: undefined,
    };

    this.handleOpenNewComponent = this.handleOpenNewComponent.bind(this);
    this.handleCloseNewComponent = this.handleCloseNewComponent.bind(this);
  }
  handleOpenNewComponent(componentType) {
    const newState = {
      ...this.state,
      showNewComponentModal: true,
      typeNewComponent: componentType,
    };
    this.setState(newState);
  }
  handleCloseNewComponent() {
    const newState = {
      ...this.state,
      showNewComponentModal: false,
      typeNewComponent: undefined,
    };
    this.setState(newState);
  }
  render() {
    const { locale, questionnaireId } = this.props;
    return (
      <div id="questionnaire-generic-input" style={{ display: !this.state.showNewComponentModal ? 'block' : 'none' }}>
        <span>{locale.addObject}</span>
        <button
          id="add-question"
          className="btn-white"
          onClick={() => {
            this.handleOpenNewComponent(QUESTION);
          }}
        >
          <span className="glyphicon glyphicon-plus" />{locale.question}
        </button>
        <button
          id="add-sequence"
          className="btn-white"
          onClick={() => {
            this.handleOpenNewComponent(SEQUENCE);
          }}
        >
          <span className="glyphicon glyphicon-plus" />{locale.sequence}
        </button>
        <button
          id="add-subsequence"
          className="btn-white"
          onClick={() => {
            this.handleOpenNewComponent(SUBSEQUENCE);
          }}
        >
          <span className="glyphicon glyphicon-plus" />{locale.subSequence}
        </button>
        <button className="btn-white"><span className="glyphicon glyphicon-plus" />{locale.pageBreak}</button>
        <button className="btn-yellow">{locale.save}<span className="glyphicon glyphicon-floppy-disk" /></button>
        <button className="btn-yellow">{locale.visualise}<span className="glyphicon glyphicon-eye-open" /></button>
        <button className="btn-yellow">
          {locale.publishQuestionnaire}<span className="glyphicon glyphicon-share-alt" />
        </button>
        <button className="btn-yellow">{locale.duplicate}<span className="glyphicon glyphicon-duplicate" /></button>
        <button className="btn-yellow">{locale.remove}<span className="glyphicon glyphicon-trash" /></button>
        <ReactModal
          isOpen={this.state.showNewComponentModal}
          onRequestClose={this.handleCloseNewComponent}
          contentLabel={this.state.typeNewComponent ? locale[`componentNew${this.state.typeNewComponent}`] : ''}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>{this.state.typeNewComponent ? locale[`componentNew${this.state.typeNewComponent}`] : ''}</h3>
              <button onClick={this.handleCloseNewComponent}><span>X</span></button>
            </div>
            <div className="popup-body">
              <ComponentNewContainer
                questionnaireId={questionnaireId}
                parentId={questionnaireId}
                typeComponent={this.state.typeNewComponent}
                onCancel={this.handleCloseNewComponent}
                onSuccess={this.handleCloseNewComponent}
              />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default GenericInput;
