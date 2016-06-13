import React, { PropTypes, Component } from 'react';
import CodeListEditor from './code-list-editor'
import { connect } from 'react-redux'
import { toggleCListEdition } from '../actions/response'
import { createCodeList, editCodeList } from '../actions/code-list'
import className from 'classnames'


function CodeListPicker(
  { responseId, edition, codeListId, isSpec, detailedCodeLists, select, locale,
    toggleCListEdition, createCodeList, editCodeList }) {
  const clSeeEdit = className('fa', isSpec ? 'fa-eye' : 'fa-pencil')
  const smartSelect = val => {
    switch (val) {
      case '_new':
        createCodeList('', responseId)
        break
      case '': 
        break
      default:
        select(val)
    }
  }
  return (
    <div>
      <div className="form-group">
        <div className="col-sm-4">
          <div className="input-group">
            <select className="form-control"
              onChange={e => smartSelect(e.target.value)}
              value={codeListId}>
              <option key={''} value={''}></option>
              <option key={'_new'} value={'_new'}>{locale.newCl}</option>
              {
                detailedCodeLists.map(({ id, label, isSpec }) => {
                  const icon = isSpec ? '[R]' : '[U]'
                  return <option key={id} value={id}>{icon} {label}</option>
                })
              }
            </select>
            {
              codeListId && 
               <span className="input-group-addon"
                  onClick={() => {
                    console.log('toggle')
                    toggleCListEdition(responseId)
                  }}>
                <span className={clSeeEdit}></span>
              </span>
            }
          </div>
        </div>
      </div>
      { edition &&
          <CodeListEditor id={codeListId} locale={locale}
            editCodeListLabel={val => editCodeList(codeListId, { label: val })}
            close={() => toggleCListEdition(responseId)}
            editable={!isSpec} />
      }
    </div>
  );
}

CodeListPicker.propTypes = {
  isSpec: PropTypes.bool, // true if a code list is selected and this code list
                          // comes from a code list specification
  codeListId: PropTypes.string, // not required, a code list is not mandatory
                                // for a response
  detailedCodeLists: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  toggleCListEdition: PropTypes.func.isRequired,
  createCodeList: PropTypes.func.isRequired,
  editCodeList: PropTypes.func.isRequired
}

//TODO filter codeListById to keep only the code lists attached to this
//questionnaire (unless we are sure that in the current state we keep only
//entities pertaining to the current questionnaire) (but code list references
//are loaded once for all the questionnaires)
const mapStateToProps = (state, { responseId, codeListId }) => {
  const codeListById = state.codeListById
  // from object to array
  const cls = Object.keys(codeListById).reduce((cls, clId) => {
    cls.push(codeListById[clId])
    return cls
  }, [])
  return {
    isSpec: codeListId ? state.codeListById[codeListId].isSpec : false,
    detailedCodeLists: cls,
    edition: !!state.appState.clEditionByResponseId[responseId]
  }
}

const mapDispatchToProps = {
  toggleCListEdition,
  createCodeList,
  editCodeList
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeListPicker)