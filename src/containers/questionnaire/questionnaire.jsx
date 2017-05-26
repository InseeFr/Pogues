import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createComponent, removeComponent, moveComponent } from 'actions/component';
import { addPageBreak, removePageBreak } from 'actions/page-break';
import { loadQuestionnaireIfNeeded } from 'actions/_questionnaire';
import Questionnaire from 'components/questionnaire/questionnaire';

const mapStateToProps = (state, { id }) => {
  const questionnaireState = state.appState.questionnaireById[id];
  const loaded = questionnaireState && questionnaireState.loaded ? questionnaireState.loaded : false;

  const props = {
    locale: state.locale,
    id: id,
    loaded: loaded,
    questionnaire: state.questionnaireById[id],
    components: loaded ? state.componentById : {},
  };

  return props;
};

const mapDispatchToProps = {
  createComponent,
  removeComponent,
  moveComponent,
  addPageBreak,
  removePageBreak,
  loadQuestionnaireIfNeeded,
};

class QuestionnaireContainer extends Component {
  static propTypes = {
    locale: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    loaded: PropTypes.bool.isRequired,
    questionnaire: PropTypes.object,
    components: PropTypes.object,
    loadQuestionnaireIfNeeded: PropTypes.func.isRequired,
    createComponent: PropTypes.func.isRequired,
    removeComponent: PropTypes.func.isRequired,
    moveComponent: PropTypes.func.isRequired,
    addPageBreak: PropTypes.func.isRequired,
    removePageBreak: PropTypes.func.isRequired,
  };

  static defaultProps = {
    questionnaire: {},
    components: {},
  };

  componentWillMount() {
    this.props.loadQuestionnaireIfNeeded(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) this.props.loadQuestionnaireIfNeeded(nextProps.id);
  }

  render() {
    if (!this.props.loaded) return <span className="fa fa-spinner fa-pulse fa-2x" />;
    return (
      <Questionnaire
        locale={this.props.locale}
        questionnaire={this.props.questionnaire}
        components={this.props.components}
        createComponent={this.props.createComponent}
        removeComponent={this.props.removeComponent}
        moveComponent={this.props.moveComponent}
        addPageBreak={this.props.addPageBreak}
        removePageBreak={this.props.removePageBreak}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireContainer);
