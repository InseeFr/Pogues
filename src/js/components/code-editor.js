import React, { PropTypes, Component } from 'react';
import Logger from '../logger/logger';
import { GENERAL } from '../constants/pogues-constants'

var logger = new Logger('CodeEditor', 'Components');

function CodeEditor({ editable, label, remove, moveUp, moveDown,
    editLabel}) {
  return (
    <div className="form-group code">
      <div className="col-sm-9">
        <input disabled={!editable}
          value={label}
          className="form-control"
          placeholder="Type a new code"
          onChange={e => editLabel(e.target.value)} />
      </div>
      { editable &&
        <div className="col-sm-3">
          <div className="btn-group btn-group-sm pull-right">
            <button className="btn btn-default"
                    onClick={moveUp}>
              <span className="glyphicon glyphicon-arrow-up"/>
            </button>
            <button className="btn btn-default"
                    onClick={moveDown}>
              <span className="glyphicon glyphicon-arrow-down"/>
            </button>
            <button className="btn btn-default"
                    onClick={remove}>
              <span className="glyphicon glyphicon-trash"/>
            </button>
          </div>
        </div>
      }
    </div>
  )
}

CodeEditor.propTypes = {
  remove: PropTypes.func.isRequired,
  editLabel: PropTypes.func.isRequired,
  editValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired
  //moveUp: PropTypes.func.isRequired,
  //moveDown: PropTypes.func.isRequired,

}

module.exports = CodeEditor;
