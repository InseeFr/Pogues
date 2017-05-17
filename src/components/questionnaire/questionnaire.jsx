import React, { Component } from 'react';
import PropTypes from 'prop-types';

import QuestionnaireElement from 'components/questionnaire/questionnaire-element';

class Questionnaire extends Component {
  constructor({ locale, questionnaire, elements }) {
    super();

    this.state = {
      selectedElementId: undefined,
    };

    this.locale = locale;
    this.questionnaire = questionnaire;
    this.elements = elements;

    this.toggleSelect = this.toggleSelect.bind(this);
    this.getSelected = this.getSelected.bind(this);
  }

  getSelected() {
    return this.state.selectedElementId;
  }

  toggleSelect(elementId) {
    debugger
    const newSelectedElementId = this.state.selectedElementId === elementId ? undefined : elementId;

    this.setState({
      selectedElementId: newSelectedElementId,
    });
  }

  render() {
    const getSelected = this.getSelected;
    const toggleSelect = this.toggleSelect;
    const listElements = this.elements.map(elementParams => {
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
          <h4>{this.questionnaire.label}</h4>
          <div>
            <button className="btn-yellow">{this.locale.showDetail}</button>
          </div>
        </div>
        <div id="questionnaire-items">
          {listElements}
        </div>
      </div>
    );
  }
}

Questionnaire.propTypes = {
  locale: PropTypes.object.isRequired,
  questionnaire: PropTypes.object.isRequired,
  elements: PropTypes.array,
};

Questionnaire.defaultProps = {
  elements: [],
};

export default Questionnaire;
