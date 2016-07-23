import React, { PropTypes } from 'react'

import {
  changeDatatypeName, changeDatatypeParam
} from '../actions/response-format'

import DatatypePicker from './datatype-picker';
import NumericDatatypeEditor from './numeric-datatype-editor';
import TextDatatypeEditor from './text-datatype-editor';
import DateDatatypeEditor from './date-datatype-editor';
import { connect } from 'react-redux'
import { DATATYPE_NAME } from '../constants/pogues-constants'

const datatypeEditors = {
  [DATATYPE_NAME.TEXT]: TextDatatypeEditor,
  [DATATYPE_NAME.NUMERIC]: NumericDatatypeEditor
  // no additional parameters for date and boolean datatype types
}

function SimpleResponseFormatEditor(
  { id, format, changeDatatypeName, changeDatatypeParam, locale }) {

  const { typeName } = format
  const DatatypeEditor = datatypeEditors[typeName]
  return (
    <div>
      <div className="form-group">
        <DatatypePicker typeName={typeName}
          select={typeName => changeDatatypeName(id, typeName)}
          locale={locale} />
      </div>
      { DatatypeEditor &&
        <div className="form-group">
        <DatatypeEditor datatype={format}
          edit={update => changeDatatypeParam(id, update)} locale={locale} />
      </div>
      }
    </div>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  changeDatatypeParam,
  changeDatatypeName
}

SimpleResponseFormatEditor.propTypes = {
  locale: PropTypes.object.isRequired,
  changeDatatypeName: PropTypes.func.isRequired,
  changeDatatypeParam: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleResponseFormatEditor)

