import React, { PropTypes } from 'react'

function ToolsActivator({ qrId, id, toggleActiveComponent, removeComponent,
   moveUpComponent, moveDownComponent }) {
  // qrId is also the id of the main sequene
  return (
      <span className="tools-activator">
        <span className="fa fa-pencil" 
          onClick={() => toggleActiveComponent(id)} />
        <span className="fa fa-trash"
          onClick={() => removeComponent(id, qrId)} />
      </span>
  )
}

ToolsActivator.propTypes = {
  id: PropTypes.string.isRequired,
  toggleActiveComponent: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired
}
export default ToolsActivator;
