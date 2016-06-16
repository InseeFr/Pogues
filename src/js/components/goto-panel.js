import GenericPanel from './generic-panel'
import GoTo from './go-to'
import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { createGoTo, removeGoTo, editGoTo } from '../actions/goTo'
import { GOTO_CONSISTENCY } from '../constants/pogues-constants'
const { AFTER, BEFORE, NON_EXISTING } = GOTO_CONSISTENCY

/**
 * GoToPanel Component
 *
 * Renders all the GoTos associated to a question or a sequence
 *
 */
function GoToPanel(
    { cmpntId, detailedGoTos, createGoTo, removeGoTo, editGoTo,
      before, after, labelToId, idToLabel, idToRank, locale }) {

  const changeTargetByName = (trueOrFalse, goToId) => name => {
    const id = labelToId[name]
    editGoTo(goToId, {
      [trueOrFalse ? 'ifTrue' : 'ifFalse']: id || name,
      [trueOrFalse ? 'ifTrueIsALabel' : 'ifFalseIsALabel']: !(id)
    })
  }
  // Event if ifTrueIsALabel is set to true, it doesn't mean that the target
  // does not exist : it might not exist when the goto was defined, but
  // having been created later.

  let goToEls = detailedGoTos.length > 0 ?
  	detailedGoTos.map(({ id, description, expression, ifTrue, ifFalse,
          ifTrueIsALabel, ifFalseIsALabel }) => {
      const cmpntRank = idToRank[cmpntId]

      const ifTrueId = ifTrueIsALabel ? labelToId[ifTrue] : ifTrue
      const ifTrueLabel = ifTrueIsALabel ? ifTrue : idToLabel[ifTrue]
      const ifTrueStatus = ifTrueId ?
        (idToRank[ifTrueId] > cmpntRank ? AFTER : BEFORE) :
        NON_EXISTING
      
      const ifFalseId = ifFalseIsALabel ? labelToId[ifFalse] : ifFalse
      const ifFalseLabel = ifFalseIsALabel ? ifFalse : idToLabel[ifFalse]
      const ifFalseStatus = ifFalseId ?
        (idToRank[ifFalseId] > cmpntRank ? AFTER : BEFORE) :
        NON_EXISTING

      return <GoTo key={id} id={id}
        before={before} after={after}
        expression={expression} description={description}
        ifTrueLabel={ifTrueLabel}
        ifFalseLabel={ifFalseLabel}
        ifTrueStatus={ifTrueStatus}
        ifFalseStatus={ifFalseStatus}
        remove={() => removeGoTo(id, cmpntId)}
        locale={locale}
        edit={update => editGoTo(id, update)}
        changeTargetTrue={changeTargetByName(true, id)}
        changeTargetFalse={changeTargetByName(false, id)} />
    }) :
    <span>{locale.noGoToYet}</span>

    return (
      <div>
        <datalist id="candidates">
          {after.map(({ id, label }) => <option key={id} value={label} />)}
        </datalist>
        <GenericPanel add={() => createGoTo(cmpntId)}
          children={goToEls} 
    	    localeAdd={locale.defineGoTo} localeTitle={locale.goTo}  />
      </div>
    )
  } 

GoToPanel.propTypes = {
  detailedGoTos: PropTypes.array.isRequired,
  createGoTo: PropTypes.func.isRequired,
  removeGoTo: PropTypes.func.isRequired,
  editGoTo: PropTypes.func.isRequired,
  before: PropTypes.array.isRequired,
  after: PropTypes.array.isRequired,
  locale: PropTypes.object.isRequired,
  labelToId: PropTypes.object.isRequired,
  idToLabel: PropTypes.object.isRequired,
  idToRank: PropTypes.object.isRequired
}

const mapStateToProps = (state, { goTos, structure, cmpntId }) => {
  const { flat, idToRank, labelToId, idToLabel } = structure
  return {
    detailedGoTos: goTos.map(id => state.goToById[id]),
    before: flat.slice(0, idToRank[cmpntId]),
    after: flat.slice(idToRank[cmpntId]+1),
    labelToId,
    idToLabel,
    idToRank,
    locale: state.locale
  }
}


const mapDispatchToProps = {
  createGoTo: createGoTo,
  editGoTo: editGoTo,
  removeGoTo: removeGoTo
}


export default connect(mapStateToProps, mapDispatchToProps)(GoToPanel)

