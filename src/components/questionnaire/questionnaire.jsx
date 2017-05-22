import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import QuestionnaireElement from 'components/questionnaire/questionnaire-element';
import QuestionnaireEditContainer from 'containers/questionnaire/questionnaire-edit';

class Questionnaire extends Component {
  static propTypes = {
    locale: PropTypes.object.isRequired,
    questionnaire: PropTypes.object.isRequired,
    elements: PropTypes.array,
  };
  static defaultProps = {
    elements: [],
  };
  constructor() {
    super();

    this.state = {
      selectedElementId: undefined,
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleQuestionnnarieUpdated = this.handleQuestionnnarieUpdated.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.getSelected = this.getSelected.bind(this);
  }

  getSelected() {
    return this.state.selectedElementId;
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleQuestionnnarieUpdated() {
    this.handleCloseModal();
  }

  toggleSelect(elementId) {
    const newSelectedElementId = this.state.selectedElementId === elementId ? undefined : elementId;

    this.setState({
      selectedElementId: newSelectedElementId,
    });
  }

  render() {
    const { locale, elements, questionnaire } = this.props;
    const getSelected = this.getSelected;
    const toggleSelect = this.toggleSelect;
    const listElements = elements.map(elementParams => {
      return (
        <QuestionnaireElement
          key={elementParams.id}
          elementParams={elementParams}
          getSelected={getSelected}
          toggleSelect={toggleSelect}
        />
      );
    });

    return (
      <div id="questionnaire">
        <div id="questionnaire-head">
          <h4>{questionnaire.label}</h4>
          <div>
            <button className="btn-yellow" onClick={this.handleOpenModal}>{locale.showDetail}</button>
          </div>
        </div>
        <div id="questionnaire-items">
          {listElements}
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          contentLabel={locale.questionnaireDetail}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>{locale.questionnaireDetail}</h3>
              <button onClick={this.handleCloseModal}><span>X</span></button>
            </div>
            <div className="popup-body">
              <QuestionnaireEditContainer
                id={questionnaire.id}
                onCancel={this.handleCloseModal}
                onSuccess={this.handleQuestionnnarieUpdated}
              />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Questionnaire;
