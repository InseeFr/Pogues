import React, { PropTypes } from 'react'
import CodeListSelector from './code-list-selector'
import VisHintPicker from './vis-hint-picker'


export default function SingleResponseFormatEditor(
  { format: { codeListReference, visHint },
  updateFormat, newCodeListFormat, locale }) {
  return (
    <div>
      <CodeListSelector
        id={codeListReference}
        title={locale.selectCl}
        select={codeListReference => updateFormat({ codeListReference })}
        create={() => newCodeListFormat()}
        locale={locale} />
      <VisHintPicker visHint={visHint}
        locale={locale}
        select={visHint => updateFormat({ visHint })}/>
    </div>

  )
}

SingleResponseFormatEditor.propTypes = {
  format: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  updateFormat: PropTypes.func.isRequired,
  newCodeListFormat: PropTypes.func.isRequired
}


