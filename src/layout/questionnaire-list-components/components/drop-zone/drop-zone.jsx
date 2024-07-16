import React from 'react';
import Dictionary from '../../../../utils/dictionary/dictionary';
import PropTypes from 'prop-types';

const DropZone = ({ style }) => {
  return (
    <div className="questionnaire-element-drop-zone" style={style}>
      <div className="questionnaire-element-label">{Dictionary.dropHere}</div>
    </div>
  );
};

DropZone.defaultProps = {
  style: {},
};

DropZone.propTypes = {
  style: PropTypes.object,
};

export default DropZone;
