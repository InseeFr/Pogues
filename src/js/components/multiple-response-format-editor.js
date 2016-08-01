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
      <div className="form-group">
        <label htmlFor="visHint" className="col-sm-5 control-label">
          Format de l'information mesurée
        </label>
        <div className="col-sm-7">
          <label className="radio-inline">
            <input type="radio" checked={!measureBoolean}
              onClick={e =>
                updateFormat({ measureBoolean: !e.target.checked}) }/>
            Liste de codes
          </label>
          <label className="radio-inline">
            <input type="radio" checked={measureBoolean}
              onClick={e =>
                updateFormat({ measureBoolean: e.target.checked}) }/>
            Booléen
          </label>
        </div>
      </div>
      { !measureBoolean && 
      <div>
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
      </div>
      }
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


