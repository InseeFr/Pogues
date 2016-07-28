import React, { PropTypes } from 'react'
import CodeListSelector from './code-list-selector'
import VisHintPicker from './vis-hint-picker'

import {
  updateMultiple, switchBooleanMultiple, newCodeListMultiple
} from '../actions/response-format'

import { AXIS } from '../constants/pogues-constants'
const { INFO, MEASURE } = AXIS
import { connect } from 'react-redux'

function MultipleResponseFormatEditor(
  { id, qrId, format,
    updateMultiple, newCodeListMultiple, switchBooleanMultiple,
    locale }) {

  const {
    infoCodeList, measureCodeList, measureBoolean, measureVisHint
  } = format

  return (
    <div>
      <CodeListSelector
        id={infoCodeList}
        title={"Axe d'information"}
        select={infoCodeList => updateMultiple(id, { infoCodeList })}
        create={() => newCodeListMultiple(id, qrId, INFO)}
        locale={locale} />
      <hr/>
      <CodeListSelector
        id={measureCodeList}
        disabled={measureBoolean}
        title={"Information mesurée"}
        select={measureCodeList => updateMultiple(id, { measureCodeList })}
        create={() => newCodeListMultiple(id, qrId, MEASURE)}
        locale={locale} />
      <VisHintPicker visHint={measureVisHint}
        disabled={measureBoolean}
        locale={locale}
        select={measureVisHint => updateMultiple(id, { measureVisHint })}/>
      <div className="form-group">
        <label htmlFor="visHint" className="col-sm-5 control-label">
          Boolean
        </label>
        <div className="col-sm-2">
          <div className="checkbox">
            {/* we use class "checkbox" to have the proper vertical
                alignment (`padding: 7px;`) but we need to remove
                `margin-left` since the class `chekbox` is intended
                to make the label appear on the right side of the box
            */}
            <input type="checkbox" style={{ marginLeft: 0 }}
            checked={measureBoolean}
            onChange={e => switchBooleanMultiple(id) }/>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  qrId: state.appState.questionnaire
})

const mapDispatchToProps = {
  updateMultiple,
  newCodeListMultiple,
  switchBooleanMultiple
}

MultipleResponseFormatEditor.propTypes = {
  id: PropTypes.string.isRequired,
  /**
   * Id of the current questionnaire
   */
  qrId: PropTypes.string.isRequired,
  format: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  updateMultiple: PropTypes.func.isRequired,
  newCodeListMultiple: PropTypes.func.isRequired,
  switchBooleanMultiple: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleResponseFormatEditor)

