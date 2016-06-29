import React, { PropTypes } from 'react'

function DeleteActivator({ qrId, id, removeComponent, removeAllowed }) {
  // qrId is also the id of the main sequene
  return (
      <span className="tools-activator">
        { removeAllowed && <span className="fa fa-trash"
          onClick={() => removeComponent(id, qrId)} /> }
      </span>
  )
}

DeleteActivator.propTypes = {
  id: PropTypes.string.isRequired,
  removeComponent: PropTypes.func.isRequired,
  removeAllowed: PropTypes.bool.isRequired
}
export default DeleteActivator;
