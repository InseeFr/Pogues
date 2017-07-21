import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dictionary from 'utils/dictionary/dictionary';

class DropZone extends Component {
  static propTypes = {
    style: PropTypes.object.isRequired,
  };
  render() {
    const { style } = this.props;
    return (
      <div style={style} className="questionnaire-element-drop-zone">
        <div className="questionnaire-element-label">
          {Dictionary.dropHere}
        </div>
      </div>
    );
  }
}

export default DropZone;
