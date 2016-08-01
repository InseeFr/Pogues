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
  updateMeasure, updateMeasureFormat,
  addMeasure, removeMeasure
} from '../actions/response-format'

import { RESPONSE_FORMAT } from '../constants/pogues-constants'
const { SIMPLE, SINGLE, MULTIPLE, TABLE } = RESPONSE_FORMAT


const Editors = {
  SIMPLE: SimpleResponseFormatEditor,
  SINGLE: SingleResponseFormatEditor,
  MULTIPLE: MultipleResponseFormatEditor,
  TABLE: TableResponseFormatEditor
}

function ResponseFormat(
  { id, qrId, formats,
    switchFormat, updateFormat, newCodeListFormat,
    updateDatatype,
    updateMeasure, updateMeasureFormat,
    addMeasure, removeMeasure,
    locale }) {
  const { type } = formats
  const ResponseFormatEditor = Editors[type]
  const format = formats[type]

  return (
    <div className="form-horizontal">
      <div className="form-group">
        <label className="col-sm-3 control-label">
          Format des réponses
        </label>
        <div className="col-sm-4">
          <ResponseFormatPicker
            types={RESPONSE_FORMAT}
            type={type} locale={locale}
            select={type => switchFormat(id, type)} />
        </div>
      </div>
      <ResponseFormatEditor format={format}
        id={id}
        qrId={qrId}
        updateFormat={update => updateFormat(id, update)}
        newCodeListFormat={ctx => newCodeListFormat(id, qrId, ctx)}
        updateMeasure={(update, index) => updateMeasure(id, update, index)}
        updateDatatype={(update, ctx) => updateDatatype(id, update, ctx)}
        updateMeasureFormat={(update, index) =>
          updateMeasureFormat(id, update, index)}
        addMeasure={index => addMeasure(id, index)}
        removeMeasure={index => removeMeasure(id, index)}
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
  updateMeasure,
  updateMeasureFormat,
  addMeasure,
  removeMeasure
}

ResponseFormat.propTypes = {
  id: PropTypes.string.isRequired,
  formats: PropTypes.object.isRequired,
  switchFormat: PropTypes.func.isRequired,
  updateFormat: PropTypes.func.isRequired,
  updateDatatype: PropTypes.func.isRequired,
  newCodeListFormat: PropTypes.func.isRequired,
  updateMeasure: PropTypes.func.isRequired,
  updateMeasureFormat: PropTypes.func.isRequired,
  addMeasure: PropTypes.func.isRequired,
  removeMeasure: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseFormat)
