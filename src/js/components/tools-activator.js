import React, { PropTypes } from 'react'

function ToolsActivator({ qrId, id, toggleActiveComponent, removeComponent }) {
  // qrId is also the id of the main sequene
  return (
      <span className="tools-activator">
        <span className="fa fa-pencil" 
          onClick={() => toggleActiveComponent(id)} />
      </span>
  )
}

ToolsActivator.propTypes = {
  id: PropTypes.string.isRequired,
  toggleActiveComponent: PropTypes.func.isRequired
}
export default ToolsActivator;
