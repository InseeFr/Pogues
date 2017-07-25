import React, { Component } from 'react';
import Dictionary from 'utils/dictionary/dictionary';

class DropZone extends Component {
  static propTypes = {};
  render() {
    return (
      <div className="questionnaire-element-drop-zone">
        <div className="questionnaire-element-label">
          {Dictionary.dropHere}
        </div>
      </div>
    );
  }
}

export default DropZone;
