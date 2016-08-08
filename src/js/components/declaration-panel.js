import GenericPanel from './generic-panel'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  createDeclaration, removeDeclaration, editDeclaration
} from '../actions/declaration'
import Declaration from './declaration'

function DeclarationlPanel(
  { cmpntId,
    detailedDeclarations, createDeclaration, removeDeclaration, editDeclaration,
    locale }) {
  
  const dclEls = detailedDeclarations.length > 0 ?
  	detailedDeclarations.map(({ id, type, position, text }) =>
      <Declaration key={id} text={text} type={type}
        position={position}
        remove={() => removeDeclaration(id, cmpntId) }
        edit={update => editDeclaration(id, update)}
        locale={locale} />
    ) :
    <span>{locale.noDeclarationYet}</span>

    return <GenericPanel add={() => createDeclaration(cmpntId)} children={dclEls} 
    	localeAdd={locale.addDeclaration} localeTitle={locale.declarations}  />
  }


DeclarationlPanel.PropTypes = {
  cmpntId: PropTypes.string.isRequired,
  detailedDeclarations: PropTypes.array.isRequired,
  createDeclaration: PropTypes.func.isRequired,
  removeDeclaration: PropTypes.func.isRequired,
  editDeclaration: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}

const mapStateToProps = (state, { declarations, cmpntId }) => {
  return {
    detailedDeclarations: declarations.map(id => state.declarationById[id])
  }
}

const mapDispatchToProps = {
  createDeclaration,
  removeDeclaration,
  editDeclaration
}

export default connect(mapStateToProps, mapDispatchToProps)(DeclarationlPanel)