import React, { PropTypes } from 'react'

function DeleteActivator({ qrId, id, removeComponent, flat, idToRank, removeAllowed }) {
  // qrId is also the id of the main sequene
  const previous = flat[idToRank[id] - 1].id
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
  flat: PropTypes.array.isRequired,
  idToRank: PropTypes.object.isRequired,
  removeAllowed: PropTypes.bool.isRequired
}
export default DeleteActivator;
