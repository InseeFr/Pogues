import React, { PropTypes, Component } from 'react';
import CodeEditor from './code-editor'
import CodeCreator from './code-creator'
import Logger from '../logger/logger'
import { loadCodeListIfNeeded } from '../actions/code-list'
import { connect } from 'react-redux'
import { createCode, editCode, removeCode } from '../actions/code'
var logger = new Logger('CodeListEditor', 'Components');

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
    const { id, loaded, label, detailedCodes, createCode, removeCode, editCode,
        close, locale, editCodeListLabel, editable }
      = this.props
    if (!loaded) return <span className="fa fa-spinner fa-pulse fa-2x"></span>
    return (
      <div>
        <div className="form-group">
          <label htmlFor="label"
            className="col-sm-2 control-label">{locale.label}</label>
            <div className="col-sm-7">
              <input type="text" id="label" disabled={!editable}
                value={label}
                onChange={e => editCodeListLabel(e.target.value)}
                className="form-control"
                placeholder="Code list name"
                />
          </div>
          { editable &&
            <div className="col-sm-1">
              <button className="btn btn-default"
                onClick={close}>
                <span className="glyphicon glyphicon-ok"></span>
              </button> 
            </div>
          }
        </div>
        { editable && <CodeCreator locale={locale}
          hndlEnterKey={val => createCode(id, val)} /> }
        { detailedCodes.map(({ id: codeId, label, value }) =>
          <CodeEditor key={codeId} id={codeId} label={label} value={value}
            editLabel={label => editCode(codeId, { label })}
            editValue={value => editCode(codeId, { value })}
            remove={() => removeCode(codeId, id)} 
            editable={editable} />) }
      </div>
    )
  }
}

CodeListEditor.propTypes = {
  id: PropTypes.string, // not required, if we cre
  loadCodeListIfNeeded: PropTypes.func.isRequired,
  detailedCodes: PropTypes.array, // not required since the codes might not be
                                 // loaded yet
  close: PropTypes.func.isRequired,
  createCode: PropTypes.func.isRequired,
  removeCode: PropTypes.func.isRequired,
  editCode: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  editCodeListLabel: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  label: PropTypes.string,
  editable: PropTypes.bool.isRequired
}

const mapStateToProps = (state, { id }) => {
  const codeList = state.codeListById[id]
  if (!codeList.loaded) return {
    loaded: false
  }
  return {
    loaded: true,
    label: codeList.label,
    detailedCodes: codeList.codes.map(codeId =>
        state.codeById[codeId])
  }
}
 const mapDispatchToProps = {
  loadCodeListIfNeeded,
  createCode,
  removeCode,
  editCode
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeListEditor)

