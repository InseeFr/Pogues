import React, { PropTypes } from 'react';
import ResponseFormatPicker from './response-format-picker'
import SimpleResponseFormatEditor from './simple-response-format-editor'
import SingleResponseFormatEditor from './single-response-format-editor'
import MultipleResponseFormatEditor from './multiple-response-format-editor'
import TableResponseFormatEditor from './table-response-format-editor'
import { connect } from 'react-redux'
import {
  switchFormat, updateFormat, newCodeListFormat,
  updateDatatype,
} from '../actions/response-format'

import { RESPONSE_FORMAT } from '../constants/pogues-constants'
const { SIMPLE, SINGLE, MULTIPLE, TABLE } = RESPONSE_FORMAT


const Editors = {
  SIMPLE: SimpleResponseFormatEditor,
  SINGLE: SingleResponseFormatEditor,
  MULTIPLE: MultipleResponseFormatEditor,
  TABLE: () => <div>table</div>,
}

function ResponseFormat(
  { id, qrId, formats,
    switchFormat, updateFormat, newCodeListFormat,
    updateDatatype,
    locale }) {
  const { type } = formats
  const ResponseFormatEditor = Editors[type]
  const format = formats[type]

  return (
    <div className="form-horizontal">
      <div className="form-group">
        <ResponseFormatPicker
          types={RESPONSE_FORMAT}
          type={type} locale={locale}
          select={type => switchFormat(id, type)} />
      </div>
      <ResponseFormatEditor format={format}
        id={id}
        qrId={qrId}
        updateFormat={update => updateFormat(id, update)}
        newCodeListFormat={() => newCodeListFormat(id, qrId)}
        updateDatatype={(update, ctx) => updateDatatype(id, update, ctx)}
        locale={locale} />
    </div>
  );
}

const mapStateToProps = (state, { id }) => ({
  // id of the response format is the question id
  formats: state.responseFormatById[id],
  locale: state.locale
})

const mapDispatchToProps = {
  switchFormat,
  updateFormat,
  updateDatatype,
  newCodeListFormat,
}

ResponseFormat.propTypes = {
  id: PropTypes.string.isRequired,
  formats: PropTypes.object.isRequired,
  switchFormat: PropTypes.func.isRequired,
  updateFormat: PropTypes.func.isRequired,
  updateDatatype: PropTypes.func.isRequired,
  newCodeListFormat: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseFormat)
