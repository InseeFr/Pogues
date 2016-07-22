import React, { PropTypes } from 'react';
import ResponseFormatPicker from './response-format-picker'
import { RESPONSE_FORMAT } from '../constants/pogues-constants'

const { SIMPLE, SINGLE, MULTIPLE, TABLE } = RESPONSE_FORMAT

const Editors = {
  SIMPLE: <div>simple</div>,
  SINGLE: <div>single</div>,
  MULTIPLE: <div>multiple</div>,
  TABLE: <div>table</div>,
}


export default function ResponseFormat(
  { id, format, locale, qrId, switchFormat, update }) {
  const ResponseFormatEditor = Editors[format.type]
  return (
    <div className="form-horizontal">
      <div className="form-group">
        <ResponseFormatPicker
          id={id}
          format={format.type} locale={locale}
          select={format => switchFormat(id, format)}/>
      </div>
        {ResponseFormatEditor}
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
