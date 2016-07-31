import React, { PropTypes } from 'react'
import CodeListSelector from './code-list-selector'
import VisHintPicker from './vis-hint-picker'
import { AXIS } from '../constants/pogues-constants'
const { INFO, MEASURE } = AXIS

export default function MultipleResponseFormatEditor(
  { format,
    updateFormat, newCodeListFormat, updateMeasureTable,
    updateMeasureFormatTable,
    locale }) {

  const {
    infoCodeList, measureCodeList, measureBoolean, measureVisHint
  } = format

  return (
    <div>
      <CodeListSelector
        id={infoCodeList}
        title={"Axe d'information"}
        select={infoCodeList => updateFormat({ infoCodeList })}
        create={() => newCodeListFormat(INFO)}
        locale={locale} />
      <hr/>
      <CodeListSelector
        id={measureCodeList}
        disabled={measureBoolean}
        title={"Information mesurée"}
        select={measureCodeList => updateFormat({ measureCodeList })}
        create={() => newCodeListFormat(MEASURE)}
        locale={locale} />
      <VisHintPicker visHint={measureVisHint}
        disabled={measureBoolean}
        locale={locale}
        select={measureVisHint => updateFormat({ measureVisHint })}/>
      <div className="form-group">
        <label htmlFor="visHint" className="col-sm-5 control-label">
          Boolean
        </label>
        <div className="col-sm-2">
          <div className="checkbox">
            {/*
              TODO improve style management
                we use class "checkbox" to have the proper vertical
                alignment (`padding: 7px;`) but we need to remove
                `margin-left` since the class `chekbox` is intended
                to make the label appear on the right side of the box
            */}
            <input type="checkbox" style={{ marginLeft: 0 }}
              checked={measureBoolean}
              onChange={e =>
                updateFormat({ measureBoolean: e.target.checked}) }/>
          </div>
        </div>
      </div>
    </div>
  )
}

MultipleResponseFormatEditor.propTypes = {
  format: PropTypes.object.isRequired,
  updateFormat: PropTypes.func.isRequired,
  newCodeListFormat: PropTypes.func.isRequired,
  updateMeasure: PropTypes.func.isRequired,
  updateMeasureFormat: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}


