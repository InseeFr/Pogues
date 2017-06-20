import React, { Component, PropTypes } from 'react'
import coupleEditorSelector from './couple-code-list-selector-editor'
import { AXIS } from '../constants/pogues-constants'
const { FIRST_INFO, SCND_INFO } = AXIS

import Measure from './measure'

export default class TableResponseFormatEditor extends Component{
  constructor(props) {
    super(props)
    this.state = { primaryEdited: false, secondaryEdited: false }
    this.toggleOrSetPrimary = edited => {
      edited !== undefined ?
        this.setState({ primaryEdited: edited }) :
        this.setState({ primaryEdited : !this.state.primaryEdited })
    }
    this.toggleOrSetSecondary = edited =>
      edited !== undefined ?
        this.setState({ secondaryEdited: edited }) :
        this.setState({ secondaryEdited : !this.state.secondaryEdited })
  }

  render(){
    const { format,  updateFormat, newCodeListFormat, updateMeasure,
      updateMeasureFormat, updateDatatype, addMeasure, removeMeasure,
      locale }
     = this.props

    const {
      firstInfoCodeList, firstInfoAsAList, firstInfoMin, firstInfoMax,
      firstInfoTotal, firstInfoTotalLabel,
      scndInfoTotal, scndInfoTotalLabel,
      hasTwoInfoAxes, scndInfoCodeList,
      measures
    } = format

    const { 
      codeListSelector: codeListSelectorPrimary,
      codeListEditor: codeListEditorPrimary
     } = coupleEditorSelector({
       id: firstInfoCodeList,
       disabled: firstInfoAsAList,
       select: firstInfoCodeList => updateFormat({ firstInfoCodeList }),
       create: () => newCodeListFormat(FIRST_INFO),
       edited: this.state.primaryEdited,
       locale }, this.toggleOrSetPrimary )
    
    const { 
      codeListSelector: codeListSelectorSecondary,
      codeListEditor: codeListEditorSecondary
     } = coupleEditorSelector({
       id: scndInfoCodeList,
       disabled: !hasTwoInfoAxes,
       select: scndInfoCodeList => updateFormat({ scndInfoCodeList }),
       create: () => newCodeListFormat(SCND_INFO),
       edited: this.state.secondaryEdited,
       locale }, this.toggleOrSetSecondary )
    
    const allowMltplMsrs = (firstInfoAsAList || !hasTwoInfoAxes)
    return (
      <div>
        <div className="form-group">
          <label htmlFor="firstInfoAsAList" className="col-sm-5 control-label">
            {locale.primaryFormat}
          </label>
          <div className="col-sm-7">
            <label className="radio-inline">
              <input type="radio" checked={!firstInfoAsAList}
                onChange={e =>
                  updateFormat({ firstInfoAsAList: !e.target.checked })} />
              {locale.codeList}
            </label>
            <label className="radio-inline">
              <input type="radio" checked={firstInfoAsAList}
                onChange={e =>
                  updateFormat({ firstInfoAsAList: e.target.checked })} />
              {locale.list}
            </label>          
          </div>
        </div>{
          !firstInfoAsAList &&
          <div>
            <div className="form-group">
              <label htmlFor="codeList" className="col-sm-5 control-label">
                {locale.primaryAxis}
              </label>
              <div className="col-sm-7">
                { codeListSelectorPrimary }
              </div>
            </div>
            <div>
              { codeListEditorPrimary }
            </div>
          </div>
        }

        { firstInfoAsAList &&
        <div>
          <div className="form-group">
            <label htmlFor="minimum"
              className="col-sm-5 control-label">
              {locale.minRowNb}
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
              {locale.maxRowNb}
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
         {locale.rowTotal}
       </label>
       <div className="col-sm-7">
         <label className="radio-inline">
           <input type="radio" checked={firstInfoTotal}
             onChange={e =>
               updateFormat({ firstInfoTotal: e.target.checked })} />
           {locale.yes}
         </label>
         <label className="radio-inline">
           <input type="radio" checked={!firstInfoTotal}
             onChange={e =>
               updateFormat({ firstInfoTotal: !e.target.checked })} />
           {locale.no}
         </label>          
       </div>
      </div>
      { firstInfoTotal && 
        <div className="form-group">
         <label className="col-sm-5 control-label">
           {locale.rowTotalLabel}
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
        {locale.addScndAxis}
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
              {locale.scndInfoAxis}
            </label>
            <div className="col-sm-7">
              { codeListSelectorSecondary }
            </div>
          </div>
          <div>  
            { codeListEditorSecondary }
          </div>
          <div className="form-group">
           <label className="col-sm-5 control-label">
             {locale.columnTotal}
           </label>
           <div className="col-sm-7">
             <label className="radio-inline">
               <input type="radio" checked={scndInfoTotal}
                 onChange={e =>
                   updateFormat({ scndInfoTotal: e.target.checked })} />
               {locale.yes}
             </label>
             <label className="radio-inline">
               <input type="radio" checked={!scndInfoTotal}
                 onChange={e =>
                   updateFormat({ scndInfoTotal: !e.target.checked })} />
               {locale.no}
             </label>          
           </div> 
          </div>
          { scndInfoTotal && 
            <div className="form-group">
             <label className="col-sm-5 control-label">
               {locale.columnTotalLabel}
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
        measures.map((measure, index) => {
          if (!allowMltplMsrs && index > 0) return null
          return (
            <div key={index}>
              <Measure
              allowRemoval={measures.length > 1 && allowMltplMsrs}
              index={index}
              allowAddition={index === measures.length - 1 && allowMltplMsrs}
              measure={measure}
              addMeasure={() => addMeasure(index)}
              removeMeasure={() => removeMeasure(index)}
              newCodeListFormat={() => newCodeListFormat(index)}
              updateFormat={update => updateMeasureFormat(update, index)}
              updateDatatype={update => updateDatatype(update, index)}
              update={update => updateMeasure(update, index)}
              locale={locale}/>
            </div>
          )
        })
      }
    </div>
    )
  }
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


