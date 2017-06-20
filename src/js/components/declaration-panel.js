import GenericPanel from './generic-panel'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  createDeclaration, removeDeclaration, editDeclaration
} from '../actions/declaration'
import { COMPONENT_TYPE } from '../constants/pogues-constants'
const { QUESTION } = COMPONENT_TYPE
import Declaration from './declaration'

function DeclarationlPanel(
  { cmpntId, isQuestion,
    detailedDeclarations, createDeclaration, removeDeclaration, editDeclaration,
    locale }) {
  
  const dclEls = detailedDeclarations.length > 0 ?
  	detailedDeclarations.map(({ id, type, position, text }) =>
      <Declaration key={id} text={text} type={type}
        position={position}
        isQuestion={isQuestion}
        remove={() => removeDeclaration(id, cmpntId) }
        edit={update => editDeclaration(id, update)}
        locale={locale} />
    ) :
    <span>{locale.noDeclarationYet}</span>

  return <GenericPanel add={() => createDeclaration(cmpntId, isQuestion)} children={dclEls} 
    	localeAdd={locale.addDeclaration} localeTitle={locale.declarations}  />
}


DeclarationlPanel.PropTypes = {
  cmpntId: PropTypes.string.isRequired,
  detailedDeclarations: PropTypes.array.isRequired,
  createDeclaration: PropTypes.func.isRequired,
  removeDeclaration: PropTypes.func.isRequired,
  editDeclaration: PropTypes.func.isRequired,
  isQuestion: PropTypes.bool.isRequired,
  locale: PropTypes.object.isRequired
}

const mapStateToProps = (state, { declarations, cmpntId }) => {
  const cmpnt = state.componentById[cmpntId]
  return {
    isQuestion: cmpnt.type === QUESTION,
    detailedDeclarations: declarations.map(id => state.declarationById[id])
  }
}

const mapDispatchToProps = {
  createDeclaration,
  removeDeclaration,
  editDeclaration
}

export default connect(mapStateToProps, mapDispatchToProps)(DeclarationlPanel)