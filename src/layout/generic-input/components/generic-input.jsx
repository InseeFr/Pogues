import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { GENERIC_INPUT } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { VisualizeDropdown } from 'widgets/visualize-dropdown';
import { ComponentNew } from 'layout/component-new';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;
const { COMPONENT_ID } = GENERIC_INPUT;

// PropTypes and defaultProps

export const propTypes = {
  placeholders: PropTypes.object.isRequired,

  saveActiveQuestionnaire: PropTypes.func.isRequired,
  visualizeActiveQuestionnaire: PropTypes.func,
  handleNewPageBreak: PropTypes.func.isRequired,

  isQuestionnaireModified: PropTypes.bool.isRequired,
  isQuestionnaireValid: PropTypes.bool.isRequired,

  componentIdForPageBreak: PropTypes.string.isRequired,
};

const defaultProps = {
  isQuestionnaireModified: false,
  visualizeActiveQuestionnaire: undefined,
  componentIdForPageBreak: '',
};

// Components

class GenericInput extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      showNewComponentModal: false,
      typeNewComponent: '',
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
      typeNewComponent: '',
    };
    this.setState(newState);
  }

  /**
   * Handler when the user want to add pageBreak to a question
   */
  handleNewPageBreak() {
    this.props.handleNewPageBreak(this.props.componentIdForPageBreak);
  }

  render() {
    const { placeholders, isQuestionnaireValid, isQuestionnaireModified, componentIdForPageBreak } = this.props;
    const typeNewComponent = this.state.typeNewComponent;
    const newComponentParent = typeNewComponent ? placeholders[typeNewComponent].parent : '';
    const newComponentWeight = typeNewComponent ? placeholders[typeNewComponent].weight : 0;

    return (
      <div id={COMPONENT_ID} style={{ display: this.state.showNewComponentModal ? 'none' : 'block' }}>
        <span>{Dictionary.addObject}</span>
        <button
          id="add-question"
          className="btn-white"
          disabled={placeholders[QUESTION].parent === ''}
          onClick={() => {
            this.handleOpenNewComponent(QUESTION);
          }}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.question}
        </button>
        <button
          id="add-subsequence"
          className="btn-white"
          disabled={placeholders[SUBSEQUENCE].parent === ''}
          onClick={() => {
            this.handleOpenNewComponent(SUBSEQUENCE);
          }}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.subSequence}
        </button>
        <button
          id="add-sequence"
          className="btn-white"
          disabled={placeholders[SEQUENCE].parent === ''}
          onClick={() => {
            this.handleOpenNewComponent(SEQUENCE);
          }}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.sequence}
        </button>
        <button
          className="btn-white"
          id="add-pagebreak"
          disabled={!componentIdForPageBreak}
          onClick={() => {
            this.handleNewPageBreak();
          }}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.pageBreak}
        </button>
        <button
          className="btn-yellow"
          disabled={!isQuestionnaireModified}
          onClick={this.props.saveActiveQuestionnaire}
          id="save"
        >
          {Dictionary.save}
          <span className="glyphicon glyphicon-floppy-disk" />
        </button>

        <VisualizeDropdown
          top
          disabled={!isQuestionnaireValid}
          visualizeActiveQuestionnaire={this.props.visualizeActiveQuestionnaire}
        />

        <button className="btn-yellow disabled" id="publish">
          {Dictionary.publishQuestionnaire}
          <span className="glyphicon glyphicon-share-alt" />
        </button>
        <ReactModal
          shouldCloseOnOverlayClick={false}
          isOpen={this.state.showNewComponentModal}
          onRequestClose={this.handleCloseNewComponent}
          contentLabel={this.state.typeNewComponent ? Dictionary[`componentNew${this.state.typeNewComponent}`] : ''}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>{this.state.typeNewComponent ? Dictionary[`componentNew${this.state.typeNewComponent}`] : ''}</h3>
              <button type="button" onClick={this.handleCloseNewComponent}>
                <span>X</span>
              </button>
            </div>
            <div className="popup-body">
              <ComponentNew
                parentId={newComponentParent}
                weight={newComponentWeight}
                type={this.state.typeNewComponent}
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
