import React, { PropTypes } from 'react';
import ResponseFormatPicker from './response-format-picker'
import { RESPONSE_FORMAT } from '../constants/pogues-constants'
import SimpleResponseFormatEditor from './simple-response-format-editor'
import SingleResponseFormatEditor from './single-response-format-editor'
const { SIMPLE, SINGLE, MULTIPLE, TABLE } = RESPONSE_FORMAT

const Editors = {
  SIMPLE: SimpleResponseFormatEditor,
  SINGLE: SingleResponseFormatEditor,
  MULTIPLE: () => <div>multiple</div>,
  TABLE: () => <div>table</div>,
}

export default function ResponseFormat(
  { id, format, locale, qrId, switchFormat, update }) {
  const { type } = format
  const ResponseFormatEditor = Editors[type]
  return (
    <div className="form-horizontal">
      <div className="form-group">
        <ResponseFormatPicker
          id={id}
          type={type} locale={locale}
          select={type => switchFormat(id, type)}/>
      </div>
        <ResponseFormatEditor id={id}
          format={format[type]} locale={locale} />
    </div>
  );
}

ResponseFormat.propTypes = {
  id: PropTypes.string.isRequired,
  qrId: PropTypes.string.isRequired,
  format: PropTypes.object.isRequired,
  switchFormat: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
}
