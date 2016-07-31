import React, { PropTypes } from 'react'

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

export default function SimpleResponseFormatEditor(
  { format, updateFormat, updateDatatype, locale }) {

  const { typeName } = format
  const DatatypeEditor = datatypeEditors[typeName]
  return (
    <div>
      <DatatypePicker typeName={typeName}
        select={typeName => updateFormat({ typeName })}
        locale={locale} />
      <div className="col-sm-offset-2">
        { DatatypeEditor &&
          <DatatypeEditor datatype={format}
            edit={update => updateDatatype(update)} locale={locale} />
        }
    </div>
    </div>
  )
}

SimpleResponseFormatEditor.propTypes = {
  format: PropTypes.object.isRequired,
  updateFormat: PropTypes.func.isRequired,
  updateDatatype: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}

