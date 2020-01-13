import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import NavigationPrompt from "react-router-navigation-prompt";
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
  isQuestionnaireHaveerror: false,
  isQuestionnaireModified: false,
  visualizeActiveQuestionnaire: undefined,
  componentIdForPageBreak: '',
};

// Components

const customModalStyles = {
  content : {
    display               : 'absolute',
    textAlign             : 'center',
    verticAlalign         : 'middle',
    top                   : '10%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    width                 : '400px',
    alignItems            : "center",
    transform             : 'translate(-50%, -50%)'
  }
};

const customModalbuttonStyles = {
    background              : '#15417a',
    color                   : 'white',
    boxShadow               : 'none',
    border                  : 'none',
    width                   : '70px',
    height                  : '30px',
    marginRight             : '10px',
    background              : '#15417a',
};

class GenericInput extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      showNewComponentModal: false,
      showNewUnsavedModal: false,
      typeNewComponent: '',
    };

    this.handleOpenNewComponent = this.handleOpenNewComponent.bind(this);
    this.handleCloseNewComponent = this.handleCloseNewComponent.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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

  handleCloseModal() {
    const newState = {
      ...this.state,
      showNewUnsavedModal: false,
    };
    this.setState(newState);
  }

  saveActiveQuestionnaire() {
    this.props.saveActiveQuestionnaire().then(()=>{
    if(this.props.isQuestionnaireHaveerror){
      const newState = {
        ...this.state,
        showNewUnsavedModal: true,
      };
      this.setState(newState);
    }
   })
  }

  /**
   * Handler when the user want to add pageBreak to a question
   */
  handleNewPageBreak() {
    this.props.handleNewPageBreak(this.props.componentIdForPageBreak);
  }

  render() {
    const {
      placeholders,
      isQuestionnaireValid,
      isQuestionnaireModified,
      componentIdForPageBreak,
    } = this.props;
    const typeNewComponent = this.state.typeNewComponent;
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
      <NavigationPrompt
        renderIfNotActive={true}
        when={isQuestionnaireModified}
       >
         {({ isActive, onCancel, onConfirm }) => {
           if (isActive) {
             return (
               <ReactModal 
                 isOpen={true}
                 ariaHideApp={false}
                 shouldCloseOnOverlayClick={false}
                 style={customModalStyles}
                 >
                   <p>{Dictionary.modification}</p>
                   <button onClick={onCancel}    style={customModalbuttonStyles} >{Dictionary.no}</button>
                   <button onClick={onConfirm} style={customModalbuttonStyles} >{Dictionary.yes}</button>
               </ReactModal>
                    );
                  }
            }}
      </NavigationPrompt>
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
              <button onClick={this.handleCloseModal} style={customModalbuttonStyles} >{Dictionary.close}</button>
         </ReactModal>
      </div>
    );
  }
}

export default GenericInput;
