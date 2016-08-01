import React, { PropTypes } from 'react'
import CodeListSelector from './code-list-selector'
import VisHintPicker from './vis-hint-picker'
import { AXIS } from '../constants/pogues-constants'
const { FIRST_INFO, SCND_INFO } = AXIS

import Measure from './measure'

export default function TableResponseFormatEditor(
  { format,
    updateFormat, newCodeListFormat, updateMeasure, updateMeasureFormat,
    updateDatatype, addMeasure, removeMeasure,
    locale }) {

  const {
    firstInfoCodeList, firstInfoAsAList, firstInfoMin, firstInfoMax,
    hasTwoInfoAxes, scndInfoCodeList,
    measures
  } = format

  return (
    <div>
      <CodeListSelector
        id={firstInfoCodeList}
        disabled={firstInfoAsAList}
        title={"Axe d'information"}
        select={firstInfoCodeList => updateFormat({ firstInfoCodeList })}
        create={() => newCodeListFormat(FIRST_INFO)}
        locale={locale} />
      <div className="form-group">
        <label htmlFor="firstInfoAsAList" className="col-sm-5 control-label">
          Axis as a list
        </label>
        <div className="col-sm-2">
          <div className="checkbox">
            <input type="checkbox" style={{ marginLeft: 0 }}
              checked={firstInfoAsAList}
              onChange={e =>
                updateFormat({ firstInfoAsAList: e.target.checked })} />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="minimum"
          className="col-sm-offset-1 col-sm-5 control-label">
          {"Number of lines min."}
        </label>
        <div className="col-sm-2">
          <input value={firstInfoMin}
            disabled={!firstInfoAsAList}
            onChange={e => updateFormat({ firstInfoMin: e.target.value })}
            type="number" className="form-control" id="minimum"
            placeholder={5}/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="maximum"
          className="col-sm-offset-1 col-sm-5 control-label">
          {"Number of lines max."}
        </label>
        <div className="col-sm-2">
          <input value={firstInfoMax}
            disabled={!firstInfoAsAList}
            onChange={e => updateFormat({ firstInfoMax: e.target.value })}
            type="number" className="form-control" id="maximum"
            placeholder={10}/>
        </div>
      </div>
    <hr/>
      <div className="form-group">
        <label htmlFor="firstInfoAsAList" className="col-sm-5 control-label">
        {"Two informartion axes"}
        </label>
        <div className="col-sm-2">
          <div className="checkbox">
            <input type="checkbox" style={{ marginLeft: 0 }}
              checked={hasTwoInfoAxes}
              onChange={e =>
                updateFormat({ hasTwoInfoAxes: e.target.checked})}/>
          </div>
        </div>
      </div>
      <CodeListSelector
        id={scndInfoCodeList}
        disabled={!hasTwoInfoAxes}
        title={"Second information axis"}
        select={scndInfoCodeList => updateFormat({ scndInfoCodeList })}
        create={() => newCodeListFormat(SCND_INFO)}
        locale={locale} />
    <hr/>
    {
      measures.map((measure, index) => (
        <div key={index}>
          <Measure
            allowRemoval={measures.length > 1}
            index={index}
            allowAddition={index === measures.length - 1}
            measure={measure}
            addMeasure={() => addMeasure(index)}
            removeMeasure={() => removeMeasure(index)}
            newCodeListFormat={() => newCodeListFormat(index)}
            updateFormat={update => updateMeasureFormat(update, index)}
            updateDatatype={update => updateDatatype(update, index)}
            update={update => updateMeasure(update, index)}
            locale={locale}/>
        </div>
      ))
    }
    </div>
  )
}

TableResponseFormatEditor.propTypes = {
  format: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  updateFormat: PropTypes.func.isRequired,
  updateDatatype: PropTypes.func.isRequired,
  updateMeasure: PropTypes.func.isRequired,
  updateMeasureFormat: PropTypes.func.isRequired,
  newCodeListFormat: PropTypes.func.isRequired,
  addMeasure: PropTypes.func.isRequired,
  removeMeasure: PropTypes.func.isRequired
}


