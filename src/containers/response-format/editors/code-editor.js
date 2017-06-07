import React from 'react';
import PropTypes from 'prop-types';

function CodeEditor({ editable, label, remove, moveUp, moveDown, editLabel }) {
  return (
    <div className="form-group code">
      <div className="col-sm-offset-3 col-sm-6">
        <input
          disabled={!editable}
          value={label}
          className="form-control"
          placeholder="Type a new code"
          onChange={e => editLabel(e.target.value)}
        />
      </div>
      {editable &&
        <div className="col-sm-3">
          <div className="btn-group btn-group-sm pull-right">
            <button
              className="btn btn-default"
              disabled={!moveUp}
              onClick={ev => {
                ev.preventDefault();
                moveUp();
              }}
            >
              <span className="glyphicon glyphicon-arrow-up" />
            </button>
            <button
              className="btn btn-default"
              disabled={!moveDown}
              onClick={ev => {
                ev.preventDefault();
                moveDown();
              }}
            >
              <span className="glyphicon glyphicon-arrow-down" />
            </button>
            <button className="btn btn-default" onClick={remove}>
              <span className="glyphicon glyphicon-trash" />
            </button>
          </div>
        </div>}
    </div>
  );
}

CodeEditor.propTypes = {
  remove: PropTypes.func.isRequired,
  editLabel: PropTypes.func.isRequired,
  // editValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  moveUp: PropTypes.func,
  moveDown: PropTypes.func,
};

CodeEditor.defaultProps = {
  moveUp: undefined,
  moveDown: undefined,
};

export default CodeEditor;
