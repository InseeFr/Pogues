import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleShowControls } from '../actions/app-state'
import classnames from 'classnames'

function IntegrityControl({ toggleShowControls, showControls, errors, locale }) {
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
  const toggleCollapseBtn =
    <a href="#" onClick={toggleShowControls}>
      { showControls ?
        <i className="fa fa-minus-square-o">&nbsp;</i> :
        <i className="fa fa-plus-square-o">&nbsp;</i>
      }
    </a>



  return (
    <div className={cl}>
      <div className="panel-heading">
        <span className="panel-title">
          { (nbErrors > 0) && toggleCollapseBtn }
          { title }
        </span>
      </div>
      { nbErrors > 0 && showControls &&
        <ul className="panel-body integrity-messages">
          { errors.map(({ params, message }, i) =>
              <li key={i} >
                <span className="integrity-entity-name">[{params[0]}] </span>
                <span>{locale[message]}</span>
              </li>) }
        </ul>
      }
    </div>)
}

IntegrityControl.propTypes = {
  errors: PropTypes.array,
  showControls: PropTypes.bool.isRequired,
  toggleShowControls: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.integrity.errors,
  locale: state.locale,
  showControls: state.appState.showControls
})

const mapDispatchToProps = {
  toggleShowControls
}

export default connect(mapStateToProps, mapDispatchToProps)(IntegrityControl)