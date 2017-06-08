import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassSet from 'react-classset';

import Dictionary from 'utils/dictionary/dictionary';

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
  componentDidMount() {
    this.ensureSelected();
  }

  componentDidUpdate() {
    this.ensureSelected();
  }

  ensureSelected() {
    if (this.props.selected) {
      this.node.scrollIntoView();
    }
  }

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
        ref={node => (this.node = node)}
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
                <button className="btn-yellow" onClick={onClickDetail}>{Dictionary.showDetail}</button>
                <button className="btn-yellow">
                  {Dictionary.duplicate}<span className="glyphicon glyphicon-duplicate" />
                </button>
                <button className="btn-yellow">
                  {Dictionary.remove}<span className="glyphicon glyphicon-trash" />
                </button>
              </div>
            : ''}
        </div>
        {children}
      </div>
    );
  }
}

export default QuestionnaireElement;
