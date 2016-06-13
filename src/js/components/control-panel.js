import GenericPanel from './generic-panel'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  createControl, removeControl, editControl
} from '../actions/control'
import Control from './control'

function ControlPanel(
  { cmpntId,
    detailedControls, createControl, removeControl, editControl,
    locale }) {
  
  const ctrlEls = detailedControls.length > 0 ?
    detailedControls.map(
      ({ id, description, expression: { text: textExpression }, failMessage,
         criticity }) =>
      <Control key={id} description={description}
        textExpression={textExpression} failMessage={failMessage}
        criticity={criticity}
        remove={() => removeControl(id, cmpntId) }
        edit={update => editControl(id, update)}
        locale={locale} />
    ) :
    <span>No control yet</span>

    return <GenericPanel add={() => createControl(cmpntId)} children={ctrlEls} 
      localeAdd={locale.addControl} localeTitle={locale.controls}  />
  }


ControlPanel.PropTypes = {
  cmpntId: PropTypes.string.isRequired,
  detailedControls: PropTypes.array.isRequired,
  createControl: PropTypes.func.isRequired,
  removeControl: PropTypes.func.isRequired,
  editControl: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}

const mapStateToProps = (state, { controls, cmpntId }) => ({
  detailedControls: controls.map(id => state.controlById[id])
})

const mapDispatchToProps = {
  createControl,
  removeControl,
  editControl
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)