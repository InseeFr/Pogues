import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Questionnaire from './questionnaire';

import Dictionary from 'utils/dictionary/dictionary';
import { formatDate, getState } from 'utils/component/component-utils';

// Prop types and default props

const propTypes = {
  loadQuestionnaireList: PropTypes.func.isRequired,
  duplicateQuestionnaire:  PropTypes.func.isRequired,
  questionnaires: PropTypes.array,
  user: PropTypes.shape({
    name: PropTypes.string,
    permission: PropTypes.string,
    id: PropTypes.string,
    picture: PropTypes.string,
  }),
};

const defaultProps = {
  questionnaires: [],
  user: {},
};

// Component

class QuestionnaireList extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      loaded: false,
    };
  }

  UNSAFE_componentWillMount() {
    if (this.props.user && this.props.user.permission){
      this.props.loadQuestionnaireList(this.props.user.permission)        
        .then(() => {
          this.setState({	
            loaded: true,	
          });
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.permission !== this.props.user.permission) {
      this.props.loadQuestionnaireList(nextProps.user.permission)
        .then(() => {
          this.setState({	
            loaded: true,	
           });
        });
    }
  }

  updateFilter(value) {
    this.setState({
      filter: value,
    });
  }

  render() {
    const { questionnaires, user } = this.props;

    const list = questionnaires
      .filter(q => {
        return (
          this.state.filter === '' ||
          q.label.toLowerCase().indexOf(this.state.filter) >= 0 ||
          getState(q.final)
            .toLowerCase()
            .indexOf(this.state.filter) >= 0 ||
          (q.lastUpdatedDate &&
            formatDate(q.lastUpdatedDate)
              .toLowerCase()
              .indexOf(this.state.filter) >= 0)
        );
      })
      .map(q => {
        return (
          <Questionnaire
            key={q.id}
            id={q.id}
            label={q.label}
            lastUpdatedDate={q.lastUpdatedDate}
            final={q.final}
            duplicateQuestionnaire = {this.props.duplicateQuestionnaire}
          />
        );
      });

    return (
      <div className="box home-questionnaires">
        <h3>{Dictionary.homeQuestionnairesInProgress}</h3>
        <h4>
          {Dictionary.stamp} {user.permission}
        </h4>
        <div id="questionnaire-list">
          {questionnaires.length > 0 ? (
            <div>
              <div className="ctrl-input">
                <input
                  className="form-control"
                  placeholder={Dictionary.search}
                  type="text"
                  onChange={e => this.updateFilter(e.target.value)}
                />
              </div>
              <div className="questionnaire-list_header">
                <div>{Dictionary.QUESTIONNAIRE}</div>
                <div>{Dictionary.state}</div>
                <div>{Dictionary.lastUpdate}</div>
              </div>
              {list}
            </div>
          ) : this.state.loaded? (
            <div className="questionnaire-list_noresults">
              {Dictionary.noQuestionnaires}
            </div>
          ) : (
            <div className="questionnaire-list_loading">
              {Dictionary.loading}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default QuestionnaireList;