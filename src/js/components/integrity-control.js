import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import classnames from 'classnames'

function IntegrityControl({ errors, locale }) {
  const nbErrors = errors.length
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
          { errors.map(({ params, message }, i) => 
              <div key={i} >
                <span>[{params[0]}]</span>
                <span>{locale[message]}</span>
              </div>) }
        </div>
      }
    </div>)
}

IntegrityControl.propTypes = {
  errors: PropTypes.array
}

const mapStateToProps = state => ({
  errors: state.integrity.errors,
  locale: state.locale
})

export default connect(mapStateToProps)(IntegrityControl)