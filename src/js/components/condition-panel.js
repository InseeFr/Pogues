import GenericPanel from './generic-panel'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  createCondition, removeCondition, editCondition
} from '../actions/condition'
import Condition from './condition'

function ConditionPanel(
  { cmpntId,
    detailedConditions, createCondition, removeCondition, editCondition,
    locale }) {

  const ctrlEls = detailedConditions.length > 0 ?
    detailedConditions.map(
      ({ id, condition, label }, i) =>
      <div>
        { i > 0 && <hr/> }
        <Condition key={id} 
          condition={condition}
          label={label}
          remove={() => removeCondition(id, cmpntId) }
          edit={update => editCondition(id, update)}
          locale={locale} />
      </div>
    ) :
    <span>{locale.noConditionYet}</span>

    return <GenericPanel add={() => createCondition(cmpntId)} children={ctrlEls}
      localeAdd={locale.addCondition} localeTitle={locale.conditions}  />
  }


ConditionPanel.PropTypes = {
  cmpntId: PropTypes.string.isRequired,
  detailedConditions: PropTypes.array.isRequired,
  createCondition: PropTypes.func.isRequired,
  removeCondition: PropTypes.func.isRequired,
  editCondition: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}

const mapStateToProps = (state, { conditions, cmpntId }) => ({
  detailedConditions: conditions.map(id => state.conditionById[id])
})

const mapDispatchToProps = {
  createCondition,
  removeCondition,
  editCondition
}

export default connect(mapStateToProps, mapDispatchToProps)(ConditionPanel)