import React, { Component, PropTypes } from 'react'
import VisHintPicker from './vis-hint-picker'
import coupleEditorSelector from './couple-code-list-selector-editor'
import SpecialCode from './special-code'

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
    const { format, updateFormat, newCodeListFormat, locale } = this.props
    const {
      codeListReference, visHint,
      hasSpecialCode, specialLabel, specialCode,
      specialUiBehaviour, specialFollowUpMessage
    } = format

    const special = {
      hasSpecialCode,
      label: specialLabel,
      code: specialCode,
      behaviour: specialUiBehaviour,
      message: specialFollowUpMessage
    }
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
        <SpecialCode update={updateFormat} locale={locale} {...special} />
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


