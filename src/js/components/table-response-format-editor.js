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
    firstInfoTotal, firstInfoTotalLabel,
    scndInfoTotal, scndInfoTotalLabel,
    hasTwoInfoAxes, scndInfoCodeList,
    measures
  } = format

  return (
    <div>
      <div className="form-group">
        <label htmlFor="firstInfoAsAList" className="col-sm-5 control-label">
          Format de l'axe principal
        </label>
        <div className="col-sm-7">
          <label className="radio-inline">
            <input type="radio" checked={!firstInfoAsAList}
              onChange={e =>
                updateFormat({ firstInfoAsAList: !e.target.checked })} />
            Liste de codes
          </label>
          <label className="radio-inline">
            <input type="radio" checked={firstInfoAsAList}
              onChange={e =>
                updateFormat({ firstInfoAsAList: e.target.checked })} />
            Liste
          </label>          
        </div>
      </div>{
        !firstInfoAsAList &&
        <div className="form-group">
          <label htmlFor="codeList" className="col-sm-5 control-label">
            Axe principal
          </label>
          <div className="col-sm-7">
            <CodeListSelector
              id={firstInfoCodeList}
              disabled={firstInfoAsAList}
              select={firstInfoCodeList => updateFormat({ firstInfoCodeList })}
              create={() => newCodeListFormat(FIRST_INFO)}
              locale={locale} />
          </div>
        </div>
      }

      { firstInfoAsAList &&
      <div>
        <div className="form-group">
          <label htmlFor="minimum"
            className="col-sm-5 control-label">
            {"Number of lines min."}
          </label>
          <div className="col-sm-2">
            <input value={firstInfoMin}
              disabled={!firstInfoAsAList}
              onChange={e => updateFormat({ firstInfoMin: e.target.value })}
              type="number" className="form-control" id="minimum" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="maximum"
            className="col-sm-5 control-label">
            {"Number of lines max."}
          </label>
          <div className="col-sm-2">
            <input value={firstInfoMax}
              disabled={!firstInfoAsAList}
              onChange={e => updateFormat({ firstInfoMax: e.target.value })}
              type="number" className="form-control" id="maximum" />
          </div>
        </div>
      </div>
    }
    <div className="form-group">
     <label className="col-sm-5 control-label">
       Total en ligne
     </label>
     <div className="col-sm-7">
       <label className="radio-inline">
         <input type="radio" checked={firstInfoTotal}
           onChange={e =>
             updateFormat({ firstInfoTotal: e.target.checked })} />
         Oui
       </label>
       <label className="radio-inline">
         <input type="radio" checked={!firstInfoTotal}
           onChange={e =>
             updateFormat({ firstInfoTotal: !e.target.checked })} />
         Non
       </label>          
     </div>
    </div>
    { firstInfoTotal && 
      <div className="form-group">
       <label className="col-sm-5 control-label">
         Libellé du total en ligne
       </label>
       <div className="col-sm-7">
         <input type="text" value={firstInfoTotalLabel} 
           className="form-control" id="pattern"
           placeholder={locale.label}
           onChange={e => updateFormat({ firstInfoTotalLabel: e.target.value })}
        />
      </div>
    </div>
    }
    {
     !firstInfoAsAList &&
     <div className="form-group">
      <label htmlFor="hasTwoInfoAxes" className="col-sm-5 control-label">
      {"Ajouter un deuxième axe"}
      </label>
      <div className="col-sm-2">
        <div className="checkbox">
          <input type="checkbox" style={{ marginLeft: 0 }}
            id="hasTwoInfoAxes"
            checked={hasTwoInfoAxes}
            onChange={e =>
              updateFormat({ hasTwoInfoAxes: e.target.checked})}/>
        </div>
      </div>
    </div>
    }
    { !firstInfoAsAList && hasTwoInfoAxes && 
      <div>
        <div className="form-group">
          <label htmlFor="codeList" className="col-sm-5 control-label">
            Second information axis
          </label>
          <div className="col-sm-7">
            <CodeListSelector
              id={scndInfoCodeList}
              disabled={!hasTwoInfoAxes}
              select={scndInfoCodeList => updateFormat({ scndInfoCodeList })}
              create={() => newCodeListFormat(SCND_INFO)}
              locale={locale} />
          </div>
        </div>
        <div className="form-group">
         <label className="col-sm-5 control-label">
           Total en colonne
         </label>
         <div className="col-sm-7">
           <label className="radio-inline">
             <input type="radio" checked={scndInfoTotal}
               onChange={e =>
                 updateFormat({ scndInfoTotal: e.target.checked })} />
             Oui
           </label>
           <label className="radio-inline">
             <input type="radio" checked={!scndInfoTotal}
               onChange={e =>
                 updateFormat({ scndInfoTotal: !e.target.checked })} />
             Non
           </label>          
         </div>
        </div>
        { scndInfoTotal && 
          <div className="form-group">
           <label className="col-sm-5 control-label">
             Libellé du total en colonne
           </label>
           <div className="col-sm-7">
             <input type="text" value={scndInfoTotalLabel} 
               className="form-control" id="pattern"
               placeholder={locale.label}
               onChange={e => updateFormat({ scndInfoTotalLabel: e.target.value })}
            />
          </div>
        </div>
        }
      </div>
    }
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


