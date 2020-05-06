import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import QuestionnaireComponent from './questionnaire-component';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

import { ComponentEdit } from 'layout/component-edit';
import { ConfirmDialog } from 'layout/confirm-dialog';
import { QuestionnaireEdit } from 'layout/questionnaire-edit';
import { ErrorsIntegrity as ErrorsIntegrityPanel } from 'layout/errors-integrity';

import Dictionary from 'utils/dictionary/dictionary';
import { getSortedChildren } from 'utils/component/component-utils';
const {LOOP} = COMPONENT_TYPE;


// Prop types and default Props
const propTypes = {
  questionnaire: PropTypes.object.isRequired,
  componentsStore: PropTypes.object,
  errorsIntegrity: PropTypes.object,

  selectedComponentId: PropTypes.string.isRequired,
  editingComponentId: PropTypes.string.isRequired,

  setSelectedComponentId: PropTypes.func.isRequired,
  setEditingComponentId: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
  dragComponent: PropTypes.func.isRequired,
  duplicateComponentAndVariables: PropTypes.func.isRequired,
  removeQuestionnaire: PropTypes.func.isRequired,
  visualizeActiveQuestionnaire: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  handleRemovePageBreak: PropTypes.func.isRequired,
};

const defaultProps = {
  componentsStore: {},
  errorsIntegrity: {},
};

// Utils

function renderComponentsByParent(parent, props, actions) {
  return getSortedChildren(props.componentsStore, parent).map(key => {
    const subTree = renderComponentsByParent(key, props, actions);
    const component = props.componentsStore[key];
    if(component.type !== LOOP) {
      return (
        <QuestionnaireComponent
          key={component.id}
          selected={props.selectedComponentId === key}
          component={component}
          visualizeActiveQuestionnaire={props.visualizeActiveQuestionnaire}
          setSelectedComponentId={props.setSelectedComponentId}
          setEditingComponentId={props.setEditingComponentId}
          duplicateComponentAndVariables={props.duplicateComponentAndVariables}
          moveComponent={props.dragComponent}
          removeComponent={props.removeComponent}
          integrityErrorsByType={props.errorsIntegrity[key]}
          parentType={props.componentsStore[component.parent].type}
          actions={actions}
          handleRemovePageBreak={event => {
            event.preventDefault();
            props.handleRemovePageBreak(key);
          }}
        >
          {subTree}
        </QuestionnaireComponent>
      );
    }

  }, {});
}

// Component

@DragDropContext(HTML5Backend)
class QuestionnaireListComponents extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      showQuestionnaireModal: false,
      showComponentModal: false,
      showRemoveQuestionnaireDialog: false,
    };

    this.handleOpenQuestionnaireDetail = this.handleOpenQuestionnaireDetail.bind(
      this,
    );
    this.handleCloseQuestionnaireDetail = this.handleCloseQuestionnaireDetail.bind(
      this,
    );

    this.handleOpenComponentDetail = this.handleOpenComponentDetail.bind(this);
    this.handleCloseComponentDetail = this.handleCloseComponentDetail.bind(
      this,
    );

    this.handleOpenRemoveQuestionnaireDialog = this.handleOpenRemoveQuestionnaireDialog.bind(
      this,
    );
    this.handleCloseRemoveQuestionnaireDialog = this.handleCloseRemoveQuestionnaireDialog.bind(
      this,
    );

    this.handleQuestionnaireDelete = this.handleQuestionnaireDelete.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.props.setSelectedComponentId('');
  }

  handleOpenQuestionnaireDetail() {
    this.setState({ showQuestionnaireModal: true });
  }

  handleCloseQuestionnaireDetail() {
    this.setState({ showQuestionnaireModal: false });
  }

  handleOpenComponentDetail() {
    this.setState({ showComponentModal: true });
  }

  handleCloseComponentDetail() {
    this.setState({ showComponentModal: false });
  }

  handleOpenRemoveQuestionnaireDialog() {
    this.setState({ showRemoveQuestionnaireDialog: true });
  }

  handleCloseRemoveQuestionnaireDialog() {
    this.setState({ showRemoveQuestionnaireDialog: false });
  }

  handleQuestionnaireDelete() {
    this.props.removeQuestionnaire(this.props.questionnaire.id).then(() => {
      this.props.navigate('/');
    });
  }

  render() {
    const {
      questionnaire,
      componentsStore,
      editingComponentId,
      errorsIntegrity,
      setSelectedComponentId,
    } = this.props;
    const componentType =
      componentsStore[editingComponentId] &&
      componentsStore[editingComponentId].type;

    const componentHeader = Dictionary[`componentEdit${componentType}`] || '';
    console.log('componentsStore', componentsStore)
    return (
      <div id="questionnaire">
        {!questionnaire.id ? (
          <span className="fa fa-spinner fa-pulse fa-2x" />
        ) : (
          <div>
            {/* Questionnaire edit */}

            <div id="questionnaire-head">
              <h4>{questionnaire.label}</h4>

              <div>
                <button
                  className="btn-yellow"
                  onClick={this.handleOpenQuestionnaireDetail}
                >
                  {Dictionary.showDetail}
                </button>
                <button
                  className="btn-yellow"
                  onClick={this.handleOpenRemoveQuestionnaireDialog}
                >
                  {Dictionary.remove}
                  <span className="glyphicon glyphicon-trash" />
                </button>
              </div>
            </div>

            {/* Questionnaire integrity errors */}

            <ErrorsIntegrityPanel
              errorsIntegrity={errorsIntegrity}
              componentsStore={componentsStore}
              setSelectedComponentId={setSelectedComponentId}
            />

            {/* Questionnaire components */}

            <div id="questionnaire-items">
              {renderComponentsByParent(questionnaire.id, this.props, {
                handleOpenComponentDetail: this.handleOpenComponentDetail,
              })}
            </div>

            {/* Questionnaire edit */}

            <ReactModal
              ariaHideApp={false}
              shouldCloseOnOverlayClick={false}
              isOpen={this.state.showQuestionnaireModal}
              onRequestClose={this.handleCloseQuestionnaireDetail}
              contentLabel={Dictionary.questionnaireDetail}
            >
              <div className="popup">
                <div className="popup-header">
                  <h3>{Dictionary.questionnaireDetail}</h3>

                  <button
                    type="button"
                    onClick={this.handleCloseQuestionnaireDetail}
                  >
                    <span>X</span>
                  </button>
                </div>
                <div className="popup-body">
                  <QuestionnaireEdit
                    onCancel={this.handleCloseQuestionnaireDetail}
                    onSuccess={this.handleCloseQuestionnaireDetail}
                  />
                </div>
              </div>
            </ReactModal>

            {/* Component edit */}

            <ReactModal
              ariaHideApp={false}
              shouldCloseOnOverlayClick={false}
              isOpen={this.state.showComponentModal}
              onRequestClose={this.handleCloseComponentDetail}
              contentLabel={componentHeader}
            >
              <div className="popup">
                <div className="popup-header">
                  <h3>{componentHeader}</h3>
                  <button
                    type="button"
                    onClick={this.handleCloseComponentDetail}
                  >
                    <span>X</span>
                  </button>
                </div>
                <div className="popup-body">
                  <ComponentEdit
                    onCancel={this.handleCloseComponentDetail}
                    onSuccess={this.handleCloseComponentDetail}
                  />
                </div>
              </div>
            </ReactModal>

            {/* Remove dialog */}

            <ConfirmDialog
              showConfirmModal={this.state.showRemoveQuestionnaireDialog}
              confirm={this.handleQuestionnaireDelete}
              closePopup={this.handleCloseRemoveQuestionnaireDialog}
            />
          </div>
        )}
      </div>
    );
  }
}

export default QuestionnaireListComponents;
