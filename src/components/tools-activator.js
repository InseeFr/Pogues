import React, { PropTypes } from 'react'

function ToolsActivator({ id, toggleActiveComponent,
    addPageBreak, hasPageBreak }) {
  // qrId is also the id of the main sequene
  return (
      <span className="tools-activator">
        {
        !hasPageBreak &&
          <span className="fa fa-arrows-h"
            onClick={() => addPageBreak(id)} />  
        }
        <span className="fa fa-pencil"
          onClick={() => toggleActiveComponent(id)} />
      </span>
  )
}

ToolsActivator.propTypes = {
  id: PropTypes.string.isRequired,
  toggleActiveComponent: PropTypes.func.isRequired,
  addPageBreak: PropTypes.func.isRequired,
  hasPageBreak: PropTypes.bool.isRequired
}
export default ToolsActivator;
