import React, { PropTypes } from 'react';

export default function Control({ id, textExpression, failMessage,
  criticity, remove, edit }) {
  return <div>A control</div>
}

Control.propTypes = {
  textExpression: PropTypes.string.isRequired,
  failMessage: PropTypes.string.isRequired,
  criticity: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired
}