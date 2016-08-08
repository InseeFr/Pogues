import React, { PropTypes } from 'react'

function DeleteActivator({ qrId, id, removeComponent, structure, removeAllowed }) {
  // qrId is also the id of the main sequene
  const previous = structure.flat[structure.idToRank[id] - 1].id
  const remove = () => removeComponent(id, qrId, previous)
  return (
      <span className="tools-activator">
        { removeAllowed && <span className="fa fa-trash"
          onClick={remove} /> }
      </span>
  )
}

DeleteActivator.propTypes = {
  id: PropTypes.string.isRequired,
  removeComponent: PropTypes.func.isRequired,
  structure: PropTypes.func.isRequired,
  removeAllowed: PropTypes.bool.isRequired
}
export default DeleteActivator;
