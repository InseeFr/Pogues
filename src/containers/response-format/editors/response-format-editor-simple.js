import React from 'react';
import PropTypes from 'prop-types';

import DatatypePicker from './datatype-picker';
import NumericDatatypeEditor from './numeric-datatype-editor';
import TextDatatypeEditor from './text-datatype-editor';
// import DateDatatypeEditor from './date-datatype-editor';
import { DATATYPE_NAME } from 'constants/pogues-constants';

const datatypeEditors = {
  [DATATYPE_NAME.TEXT]: TextDatatypeEditor,
  [DATATYPE_NAME.NUMERIC]: NumericDatatypeEditor,
  // no additional parameters for date and boolean datatype types
};

function SimpleResponseFormatEditor({ format, mandatory, toggleMandatory, updateFormat, updateDatatype, locale }) {
  const { typeName } = format;

  // TODO pass a dedicated prop to know if we are within a table response
  // format editor
  const notATable = mandatory !== undefined;

  const DatatypeEditor = datatypeEditors[typeName];
  return (
    <div>
      <div className="form-group">
        <label className="col-sm-5 control-label">
          {locale.responseType}
        </label>
        <div className="col-sm-4">
          <DatatypePicker typeName={typeName} select={typeName => updateFormat({ typeName })} locale={locale} />
        </div>
      </div>
      {DatatypeEditor &&
        <DatatypeEditor datatype={format[typeName]} edit={update => updateDatatype(update)} locale={locale} />}
      {notATable &&
        <div className="form-group">
          <label className="col-sm-5 control-label">
            {locale.mandatory}
          </label>
          <div className="col-sm-4">
            <div className="checkbox">
              <input type="checkbox" style={{ marginLeft: 0 }} checked={mandatory} onChange={toggleMandatory} />
            </div>
          </div>
        </div>}
    </div>
  );
}

SimpleResponseFormatEditor.propTypes = {
  format: PropTypes.object.isRequired,
  updateFormat: PropTypes.func.isRequired,
  updateDatatype: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  mandatory: PropTypes.bool,
  toggleMandatory: PropTypes.func,
};

SimpleResponseFormatEditor.defaultProps = {
  mandatory: undefined,
  toggleMandatory: undefined,
};

export default SimpleResponseFormatEditor;
