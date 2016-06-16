import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import classnames from 'classnames'

function IntegrityControl({ nbErrors, errors }) {
  const cl = classnames('panel',
     nbErrors > 0 ? 'panel-danger' : 'panel-warning')

  let title
  if (nbErrors === 0) {
    title = 'Votre questionnaire est top'
  }
  else {
    title = `Votre questionnaire comporte ${nbErrors} erreur(s)`
  }
  return (
    <div className={cl}>
      <div className="panel-heading">
        <h3 className="panel-title">
          { title }
        </h3>
      </div>
      { nbErrors > 0 && 
        <div className="panel-body">
          { errors.map(err => <span>{err}</span>) }
        </div>
      }
    </div>)
}

IntegrityControl.propTypes = {
  nbErrors: PropTypes.number,
  errors: PropTypes.array
}

const mapStateToProps = state => ({
  nbErrors: state.integrity.nbErrors,
  errors: state.integrity.errors
})

export default connect(mapStateToProps)(IntegrityControl)