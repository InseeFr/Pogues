import React, { Component, PropTypes } from 'react'
import VisHintPicker from './vis-hint-picker'
import coupleEditorSelector from './couple-code-list-selector-editor'


export default class SingleResponseFormatEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { edited: false }
    this.toggleOrSet = edited => 
      edited !== undefined ?
        this.setState({ edited }) :
        this.setState({ edited: !this.state.edited })
  }
  
  render() {
    const { format: { codeListReference, visHint },
      updateFormat, newCodeListFormat, locale } = this.props
    const { codeListSelector, codeListEditor } = coupleEditorSelector({
      id: codeListReference,
      select: codeListReference => updateFormat({ codeListReference }),
      create: () => newCodeListFormat(),
      edited: this.state.edited,
      locale }, this.toggleOrSet)
    return (
      <div>
        <div className="form-group">
          <label htmlFor="codeList" className="col-sm-5 control-label">
            {locale.selectCl}
          </label>
          <div className="col-sm-7">
            { codeListSelector }
          </div>
        </div>
        <div>
        { codeListEditor }
        </div>
        <VisHintPicker visHint={visHint}
          locale={locale}
          select={visHint => updateFormat({ visHint })}/>
      </div>
    )
  }
}

SingleResponseFormatEditor.propTypes = {
  format: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  updateFormat: PropTypes.func.isRequired,
  newCodeListFormat: PropTypes.func.isRequired
}


