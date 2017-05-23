import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassSet from 'react-classset';

class QuestionnaireElement extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.object),
    onClickElement: PropTypes.func.isRequired,
    onClickDetail: PropTypes.func.isRequired,
  };
  static defaultProps = {
    children: [],
  };
  render() {
    const { name, type, label, selected, children, onClickElement, onClickDetail } = this.props;
    return (
      <div
        className={ClassSet({
          'questionnaire-element': true,
          selected: selected,
          'questionnaire-sequence': type === 'SEQUENCE',
          'questionnaire-question': type === 'QUESTION',
        })}
      >
        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
        <div className="questionnaire-element-info" onClick={onClickElement}>
          <div className="questionnaire-element-name">
            {name}
          </div>
          <div className="questionnaire-element-label">
            {label}
          </div>
          {selected
            ? <div className="questionnaire-element-actions">
                <button className="btn-yellow" onClick={onClickDetail}>Voir le détail</button>
                <button className="btn-yellow">Dupliquer</button>
                <button className="btn-yellow">Supprimer</button>
              </div>
            : ''}
        </div>
        {children}
      </div>
    );
  }
}

export default QuestionnaireElement;
