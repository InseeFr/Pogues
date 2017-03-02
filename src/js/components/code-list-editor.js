import React, { PropTypes, Component } from 'react';
import CodeEditor from './code-editor'
import CodeCreator from './code-creator'
import { editCodeList, loadCodeListIfNeeded } from '../actions/code-list'
import { connect } from 'react-redux'
import {
  createCode, editCode, removeCode, moveUpCode, moveDownCode
} from '../actions/code'

/**
 * Manage code list label and codes
 */
class CodeListEditor extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount() {
    this.props.loadCodeListIfNeeded(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id)
      this.props.loadCodeListIfNeeded(nextProps.id)
  }

  render() {
    const {
      id, loaded, label, detailedCodes, createCode, removeCode, editCode,
      locale, editCodeList, editable, moveUpCode, moveDownCode
    } = this.props
    if (!loaded) return <span className="fa fa-spinner fa-pulse fa-2x"></span>
    return (
      <div className="panel panel-default">
        <div className="panel-body bg-primary">
          <div className="form-group">
            <label htmlFor="label"
              className="col-sm-2 control-label">{locale.label}
            </label>
            <div className="col-sm-10">
              <input type="text" id="label" disabled={!editable}
                value={label || ''}
                onChange={e => editCodeList(id, { label: e.target.value })}
                className="form-control"
                placeholder="Code list name" />
            </div>
          </div>
          { editable && <CodeCreator locale={locale}
            hndlEnterKey={val => createCode(id, val)} /> }
          { detailedCodes.map(({ id: codeId, label, value }) =>
            <CodeEditor key={codeId} id={codeId} label={label} value={value}
              editLabel={label => editCode(codeId, { label })}
              editValue={value => editCode(codeId, { value })}
              remove={() => removeCode(codeId, id)}
              moveUp={() => moveUpCode(codeId, id)}
              moveDown={() => moveDownCode(codeId, id)}
              editable={editable} />) }
      </div>
    </div>
    )
  }
}

CodeListEditor.propTypes = {
  /**
   * Code list id
   */
  id: PropTypes.string.isRequired,
  /**
   * Load code list 
   * 
   * Only for code list specification which have not been retrieved.
   */
  loadCodeListIfNeeded: PropTypes.func.isRequired,
  /**
   * Codes the code list is made of
   * 
   * An array of codes
   */
  detailedCodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
  })), // not required since the codes might not be loaded yet
  /**
   * Code list label
   */
  label: PropTypes.string,
  /**
   * Is the code list editable ? (a code list specification is not editable)
   */
  editable: PropTypes.bool,
  /**
   * Add code to the code list
   * 
   * Takes the code list id as its first argument and the code label
   * as its second argument.
   */
  createCode: PropTypes.func.isRequired,
  /**
   * Remove a code from a code list.
   * 
   * Takes the code list id as its only argument.
   */
  removeCode: PropTypes.func.isRequired,
  /**
   * Move a code up
   * 
   * Take the code list id as its first argument and the code id as its
   * second argument.
   */
  moveUpCode: PropTypes.func.isRequired,
  /**
  * Move a code down
  * 
  * Take the code list id as its first argument and the code id as its
  * second argument.
  */
  moveDownCode: PropTypes.func.isRequired,
  /**
   * Edit a code
   * 
   * Takes the code id as its first argument and an object with the properties
   * to update as its second argument.
   */
  editCode: PropTypes.func.isRequired,
  /**
   * Is the code list loaded ?
   * 
   * Only relevant for code list specification.
   */
  loaded: PropTypes.bool.isRequired,
  /**
   * Edit a code list
   * 
   * Takes the code list id as its first argument and an object with the
   * properties to update as its second argument.
   */
  editCodeList: PropTypes.func.isRequired,
  /**
   * Dictionary
   */
  locale: PropTypes.object.isRequired
}

const mapStateToProps = (state, { id }) => {
  const codeList = state.codeListById[id]
  if (codeList.isSpec && !codeList.loaded) return {
    loaded: false
  }
  return {
    loaded: true,
    label: codeList.label,
    editable: !codeList.isSpec,
    detailedCodes: codeList.codes.map(codeId => state.codeById[codeId])
  }
}
const mapDispatchToProps = {
  loadCodeListIfNeeded,
  createCode,
  removeCode,
  moveUpCode,
  moveDownCode,
  editCode,
  editCodeList
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeListEditor)

