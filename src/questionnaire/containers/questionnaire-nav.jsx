import React, { Component } from 'react';
import { setSelectedComponentId } from 'actions/app-state';
import { connect } from 'react-redux';
import ArboSimplified from 'questionnaire/components/arbo-simplifield';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';

const mapStateToProps = state => ({
  questionnaire: state.appState.activeQuestionnaire,
  components: state.appState.activeComponentsById,
  selectedComponentId: state.appState.selectedComponentId,
});

const mapDispatchToProps = {
  setSelectedComponentId,
};

export class QuestionnaireNavContainer extends Component {
  static propTypes = {
    questionnaire: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    setSelectedComponentId: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div id="questionnaire-nav">
        <ul>
          <li><span className="glyphicon glyphicon-home" /><a href="#/">{Dictionary.backToHomePage}</a></li>
          <li><span className="glyphicon glyphicon-link" /><a href="#">{Dictionary.seeFilters}</a></li>
        </ul>
        <ArboSimplified
          components={this.props.components}
          questionnaire={this.props.questionnaire}
          setSelectedComponentId={this.props.setSelectedComponentId}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireNavContainer);
