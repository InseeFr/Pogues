import React, { PropTypes } from 'react'

export default function PageBreak(remove) {
  return (
      <div className="page-break">
        <span onClick={remove}>&times;</span>
      </div>
    )
}

PageBreak.PropTypes = {
  remove: PropTypes.func.isRequired
}