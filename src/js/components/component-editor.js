import React, { PropTypes } from 'react';
import { nameFromLabel } from '../utils/name-utils';
import Declaration from './declaration';
import Control from './control';
import GoTo from './go-to';
import { connect } from 'react-redux'
import Logger from '../logger/logger';
import { flatten } from '../utils/data-utils'
var logger = new Logger('ComponentEditor', 'Components');

import ResponsePanel from './response-panel';
import DeclarationPanel from './declaration-panel'
import GoToPanel from './goto-panel'
import ControlPanel from './control-panel'

import { editComponent, toggleActiveComponent } from '../actions/component'

import { COMPONENT_TYPE } from '../constants/pogues-constants'
const { QUESTION, SEQUENCE } = COMPONENT_TYPE

function ComponentEditor({ 
    id, name, label, type,// component properties
    structure, // structure of the questionnaire
    changeName, changeLabel, quitEdition, // component utilities
    goTos, declarations, controls, 
    responses, //for questions only
    locale }) {
    
    let questionEl
    if (type === QUESTION) {
      questionEl = <ResponsePanel responses={responses} cmpntId={id}
        locale={locale} />
    }  

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label htmlFor="label" className="control-label sr-only">
            {locale.label}
          </label>
          <div className="col-sm-7">
            <input value={label}
              onChange={e => changeLabel(id, e.target.value)}
              type="text" className="form-control" id="label"
              placeholder={locale.label}/>
          </div>
          <label htmlFor="name" className="control-label sr-only">
            {locale.name}
          </label>
          <div className="col-sm-3">
            <input value={name}
               onChange={e => changeName(id, e.target.value)}
               type="text" className="form-control" id="name"
               placeholder={locale.name}/>
          </div>
          <div className="col-sm-2">
            <button onClick={() => quitEdition(id)}
              className="btn btn-default pull-right">
              <span className="glyphicon glyphicon-ok"/>
            </button>
            </div>
        </div>
        <DeclarationPanel declarations={declarations} cmpntId={id}
          locale={locale} />        
        <ControlPanel structure={structure} controls={controls}
          cmpntId={id} locale={locale} />
         { questionEl }
        <GoToPanel structure={structure} goTos={goTos} cmpntId={id}
          locale={locale} />
      </div>
    )
}

ComponentEditor.propTypes = {
  changeName: PropTypes.func.isRequired,
  changeLabel: PropTypes.func.isRequired,
  quitEdition: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  goTos: PropTypes.array.isRequired,
  declarations: PropTypes.array.isRequired,
  controls: PropTypes.array.isRequired,
  responses: PropTypes.array, // not required for sequences
  structure: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired
}

// ownProps contains the questionnaire id (’qrId')
// and the component id (‘id‘)
const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps
  const { name, label, type, goTos, controls, declarations, responses } = 
    state.componentById[id]

  return {
    id, 
    name,
    label,
    type,
    goTos,
    controls,
    declarations,
    responses, // for questions only
    locale: state.locale
  }
}

const mapDispatchToProps = {
  quitEdition: toggleActiveComponent,
  changeName: (id, name) => editComponent(id, { name }),
  changeLabel: (id, label) => editComponent(id, { label })
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentEditor)
