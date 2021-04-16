import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import NavigationPrompt from 'react-router-navigation-prompt';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { GENERIC_INPUT } from 'constants/dom-constants';
import Dictionary from 'utils/dictionary/dictionary';
import { VisualizeDropdown } from 'widgets/visualize-dropdown';
import { ComponentNew } from 'layout/component-new';
import { QuestionnaireList } from 'layout/questionnaire-list';

const { QUESTION, SEQUENCE, SUBSEQUENCE, LOOP, FILTER } = COMPONENT_TYPE;
const { COMPONENT_ID } = GENERIC_INPUT;

// PropTypes and defaultProps

export const propTypes = {
  placeholders: PropTypes.object.isRequired,

  saveActiveQuestionnaire: PropTypes.func.isRequired,
  visualizeActiveQuestionnaire: PropTypes.func,
  handleNewPageBreak: PropTypes.func.isRequired,
  isQuestionnaireModified: PropTypes.bool.isRequired,
  isQuestionnaireValid: PropTypes.bool.isRequired,
  isLoopsValid: PropTypes.bool.isRequired,

  componentIdForPageBreak: PropTypes.string.isRequired,
};

const defaultProps = {
  isQuestionnaireHaveError: false,
  isQuestionnaireModified: false,
  visualizeActiveQuestionnaire: undefined,
  componentIdForPageBreak: '',
};

// Components

const customModalStyles = {
  content: {
    display: 'absolute',
    textAlign: 'center',
    verticAlalign: 'middle',
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '400px',
    alignItems: 'center',
    transform: 'translate(-50%, -50%)',
  },
};
const customLoopModalStyles = {
  content: {
    display: 'absolute',
    textAlign: 'center',
    verticAlalign: 'middle',
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '800px',
    alignItems: 'center',
    transform: 'translate(-50%, -50%)',
  },
};

const customModalbuttonStyles = {
  background: '#15417a',
  color: 'white',
  boxShadow: 'none',
  border: 'none',
  width: '70px',
  height: '30px',
  marginRight: '10px',
  background: '#15417a',
};

class GenericInput extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      showNewComponentModal: false,
      showNewUnsavedModal: false,
      showNewLoopModal: false,
      typeNewComponent: '',
      showNewQuestionnaire: false,
    };

    this.handleOpenNewComponent = this.handleOpenNewComponent.bind(this);
    this.handleCloseNewComponent = this.handleCloseNewComponent.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleNewQuestion = this.handleNewQuestion.bind(this);
    this.handleCloseNewQuestion = this.handleCloseNewQuestion.bind(this);
  }

  handleNewQuestion() {
    const newState = {
      ...this.state,
      showNewQuestionnaire: true,
    };
    this.setState(newState);
    this.props.loadQuestionnaireList(this.props.stamp, this.props.token);
  }

  handleCloseNewQuestion() {
    const newState = {
      ...this.state,
      showNewQuestionnaire: false,
    };
    this.setState(newState);
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
      showNewUnsavedModal: false,
      typeNewComponent: '',
    };
    this.setState(newState);
  }

  handleCloseModal() {
    const newState = {
      ...this.state,
      showNewUnsavedModal: false,
      showNewLoopModal: false,
    };
    this.setState(newState);
  }

  /**
   * Handler when the user want to add pageBreak to a question
   */
  handleNewPageBreak() {
    this.props.handleNewPageBreak(this.props.componentIdForPageBreak);
  }

  saveActiveQuestionnaire() {
    if (!this.props.isLoopsValid) {
      const newState = {
        ...this.state,
        showNewLoopModal: true,
      };
      this.setState(newState);
    } else {
      this.props.saveActiveQuestionnaire().then(() => {
        if (this.props.isQuestionnaireHaveError) {
          const newState = {
            ...this.state,
            showNewUnsavedModal: true,
          };
          this.setState(newState);
        }
      });
    }
  }

  render() {
    const {
      placeholders,
      isQuestionnaireValid,
      isQuestionnaireModified,
      componentIdForPageBreak,
      activeQuestionnaire,
    } = this.props;
    const { typeNewComponent } = this.state;
    const newComponentParent = typeNewComponent
      ? placeholders[typeNewComponent].parent
      : '';
    const newComponentWeight = typeNewComponent
      ? placeholders[typeNewComponent].weight
      : 0;

    return (
      <div
        id={COMPONENT_ID}
        style={{ display: this.state.showNewComponentModal ? 'none' : 'block' }}
      >
        <NavigationPrompt renderIfNotActive when={isQuestionnaireModified}>
          {({ isActive, onCancel, onConfirm }) => {
            if (isActive) {
              return (
                <ReactModal
                  isOpen
                  ariaHideApp={false}
                  shouldCloseOnOverlayClick={false}
                  style={customModalStyles}
                >
                  <p>{Dictionary.modification}</p>
                  <button onClick={onCancel} style={customModalbuttonStyles}>
                    {Dictionary.no}
                  </button>
                  <button onClick={onConfirm} style={customModalbuttonStyles}>
                    {Dictionary.yes}
                  </button>
                </ReactModal>
              );
            }
            return null;
          }}
        </NavigationPrompt>
        <span>{Dictionary.addObject}</span>
        <button
          id="add-question"
          className="btn-white"
          disabled={placeholders[QUESTION].parent === ('' || 'idendquest')}
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
          disabled={placeholders[SUBSEQUENCE].parent === ('' || 'idendquest')}
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
          id="add-loop"
          className="btn-white"
          disabled={!placeholders[LOOP]}
          onClick={() => {
            this.handleOpenNewComponent(LOOP);
          }}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.loop}
        </button>
        {activeQuestionnaire.dynamiqueSpecified === 'Filtres' ? (
          <button
            id="add-loop"
            className="btn-white"
            disabled={!placeholders[FILTER]}
            onClick={() => {
              this.handleOpenNewComponent(FILTER);
            }}
          >
            <span className="glyphicon glyphicon-plus" />
            {Dictionary.filtre}
          </button>
        ) : (
          false
        )}

        <button
          className="btn-white disabled"
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
          onClick={() => {
            this.saveActiveQuestionnaire();
          }}
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
        <button
          id="add-questionnaire"
          className="btn-white"
          type="button"
          onClick={() => {
            this.handleNewQuestion();
          }}
        >
          <span className="glyphicon glyphicon-plus" />
          {Dictionary.QUESTIONNAIRE}
        </button>

        <button className="btn-yellow disabled" id="publish">
          {Dictionary.publishQuestionnaire}
          <span className="glyphicon glyphicon-share-alt" />
        </button>
        <ReactModal
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
          isOpen={this.state.showNewComponentModal}
          onRequestClose={this.handleCloseNewComponent}
          contentLabel={
            this.state.typeNewComponent
              ? Dictionary[`componentNew${this.state.typeNewComponent}`]
              : ''
          }
        >
          <div className="popup">
            <div className="popup-header">
              <h3>
                {this.state.typeNewComponent
                  ? Dictionary[`componentNew${this.state.typeNewComponent}`]
                  : ''}
              </h3>
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
        <ReactModal
          isOpen={this.state.showNewUnsavedModal}
          ariaHideApp={false}
          style={customModalStyles}
        >
          <p>{Dictionary.notSaved}</p>
          <button
            onClick={this.handleCloseModal}
            style={customModalbuttonStyles}
          >
            {Dictionary.close}
          </button>
        </ReactModal>
        <ReactModal
          isOpen={this.state.showNewLoopModal}
          ariaHideApp={false}
          style={customLoopModalStyles}
        >
          <p>{Dictionary.loopNotSaved}</p>
          <button
            onClick={this.handleCloseModal}
            style={customModalbuttonStyles}
          >
            {Dictionary.close}
          </button>
        </ReactModal>
        <ReactModal
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
          isOpen={this.state.showNewQuestionnaire}
          onRequestClose={this.handleCloseNewQuestion}
        >
          <div className="popup">
            <div className="popup-header">
              <button type="button" onClick={this.handleCloseNewQuestion}>
                <span>X</span>
              </button>
            </div>
            <div className="popup-body">
              <QuestionnaireList
                fusion
                currentQuestion={this.props.currentQuestion}
                handleCloseNewQuestion={this.handleCloseNewQuestion}
              />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default GenericInput;
