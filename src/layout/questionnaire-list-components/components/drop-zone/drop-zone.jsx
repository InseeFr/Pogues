import React, { Component } from 'react';
import Dictionary from 'utils/dictionary/dictionary';
import PropTypes from 'prop-types';

class DropZone extends Component {
  static defaultProps = {
    style: {},
  };

  static propTypes = {
    style: PropTypes.object,
  };

  render() {
    return (
      <div className="questionnaire-element-drop-zone" style={this.props.style}>
        <div className="questionnaire-element-label">{Dictionary.dropHere}</div>
      </div>
    );
  }
}

export default DropZone;
