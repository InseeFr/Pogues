import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dictionary from 'utils/dictionary/dictionary';

import QuestionnaireList from 'home/components/questionnaire-list';

const mapStateToProps = state => {
  const questionnaires = Object.keys(state.questionnaireById).map(key => state.questionnaireById[key]);
  return {
    questionnaires,
    user: state.appState.user,
  };
};

export class QuestionnaireListContainer extends Component {
  static propTypes = {
    questionnaires: PropTypes.array.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      permission: PropTypes.string,
      id: PropTypes.string,
      picture: PropTypes.string,
    }),
  };
  static defaultProps = {
    user: {},
  };

  render() {
    const { questionnaires, user } = this.props;
    return (
      <div className="box home-questionnaires">
        <h3>{Dictionary.homeQuestionnairesInProgress}</h3>
        <h4>
          {Dictionary.stamp} {user.permission}
        </h4>
        <QuestionnaireList questionnaires={questionnaires} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuestionnaireListContainer);
