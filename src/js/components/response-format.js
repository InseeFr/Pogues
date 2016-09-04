import React, { PropTypes } from 'react';
import ResponseFormatPicker from './response-format-picker'
import SimpleResponseFormatEditor from './simple-response-format-editor'
import SingleResponseFormatEditor from './single-response-format-editor'
import MultipleResponseFormatEditor from './multiple-response-format-editor'
import TableResponseFormatEditor from './table-response-format-editor'
import { connect } from 'react-redux'
import {
  switchFormat, updateFormat, newCodeListFormat,
  updateDatatype, updateResponse,
  updateMeasure, updateMeasureFormat,
  addMeasure, removeMeasure
} from '../actions/response-format'

import { QUESTION_TYPE_ENUM } from '../constants/schema'
const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM


const Editors = {
  SIMPLE: SimpleResponseFormatEditor,
  SINGLE_CHOICE: SingleResponseFormatEditor,
  MULTIPLE_CHOICE: MultipleResponseFormatEditor,
  TABLE: TableResponseFormatEditor
}

function ResponseFormat(
  { id, qrId, formats,
    switchFormat, updateResponse, updateFormat, newCodeListFormat,
    updateDatatype,
    updateMeasure, updateMeasureFormat,
    addMeasure, removeMeasure,
    locale }) {
  const { type, mandatory } = formats
  const ResponseFormatEditor = Editors[type]
  const format = formats[type]

  return (
    <div className="form-horizontal">
      <div className="form-group">
        <label className="col-sm-3 control-label">
          {locale.responseFormats}
        </label>
        <div className="col-sm-4">
          <ResponseFormatPicker
            types={QUESTION_TYPE_ENUM}
            type={type} locale={locale}
            select={type => switchFormat(id, type)} />
        </div>
      </div>
      <ResponseFormatEditor format={format}
        id={id}
        qrId={qrId}
        mandatory={mandatory}
        toggleMandatory={() => updateResponse(id, { mandatory: !mandatory })}
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
  updateResponse,
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
