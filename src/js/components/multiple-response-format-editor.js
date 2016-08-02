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
      <div className="form-group">
        <label htmlFor="codeList" className="col-sm-5 control-label">
          Axe d'information
        </label>
        <div className="col-sm-7">
          <CodeListSelector
            id={infoCodeList}
            select={infoCodeList => updateFormat({ infoCodeList })}
            create={() => newCodeListFormat(INFO)}
            locale={locale} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="visHint" className="col-sm-5 control-label">
          Format de l'information mesurée
        </label>
        <div className="col-sm-7">
          <label className="radio-inline">
            <input type="radio" checked={!measureBoolean}
              onChange={e =>
                updateFormat({ measureBoolean: !e.target.checked}) }/>
            Liste de codes
          </label>
          <label className="radio-inline">
            <input type="radio" checked={measureBoolean}
              onChange={e =>
                updateFormat({ measureBoolean: e.target.checked}) }/>
            Booléen
          </label>
        </div>
      </div>
      { !measureBoolean && 
      <div>
        <div className="form-group">
          <label htmlFor="codeList" className="col-sm-5 control-label">
            Information mesurée
          </label>
          <div className="col-sm-7">
            <CodeListSelector
              id={measureCodeList}
              disabled={measureBoolean}
              select={measureCodeList => updateFormat({ measureCodeList })}
              create={() => newCodeListFormat(MEASURE)}
              locale={locale} />
            </div>
        </div>
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


