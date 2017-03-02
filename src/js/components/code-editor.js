import React, { PropTypes, Component } from 'react';
import Logger from '../logger/logger';
import { GENERAL } from '../constants/pogues-constants'

var logger = new Logger('CodeEditor', 'Components');

/**
 * Edition of a code, made of an input field and action buttons
 * 
 * A code can be edited, removed, moved down, moved up
 */
export default function CodeEditor({ editable, label, remove, moveUp, moveDown,
    editLabel}) {
  return (
    <div className="form-group code">
      <div className="col-sm-offset-3 col-sm-6">
        <input disabled={!editable}
          value={label}
          className="form-control"
          placeholder="Type a new code"
          onChange={e => editLabel(e.target.value)} />
      </div>
      { editable &&
        <div className="col-sm-3">
          <div className="btn-group btn-group-sm pull-right"> 
            <button className="btn btn-default" disabled={!moveUp}
                    onClick={moveUp}> 
              <span className="glyphicon glyphicon-arrow-up"/> 
            </button> 
            <button className="btn btn-default" disabled={!moveDown}
                    onClick={moveDown}> 
              <span className="glyphicon glyphicon-arrow-down"/> 
            </button> 
            <button className="btn btn-default" onClick={remove}>
              <span className="glyphicon glyphicon-trash"/>
            </button>
          </div>
        </div>
      }
    </div>
  )
}

CodeEditor.propTypes = {
  /**
   * Click on trash icon handler
   */
  remove: PropTypes.func.isRequired,
  /**
   * Edit input field (code label)
   */
  editLabel: PropTypes.func.isRequired,
  /**
   * Input field value (code label)
   */
  label: PropTypes.string.isRequired,
  /**
   * Set to false is a code belongs to a code list specification which can not
   * be edited
   */
  editable: PropTypes.bool.isRequired,
  /**
   * Click handler for the arrow up button
   */
  moveUp: PropTypes.func,
  /**
   * Click handler for the arrow down button
   */
  moveDown: PropTypes.func,
}

