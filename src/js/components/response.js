import React, { PropTypes } from 'react';
import DatatypePicker from './datatype-picker';
import CodeListPicker from './code-list-picker';

import NumericDatatypeEditor from './numeric-datatype-editor';
import TextDatatypeEditor from './text-datatype-editor';
import DateDatatypeEditor from './date-datatype-editor';

import { DATATYPE_NAME } from '../constants/pogues-constants'

const editors = {
  [DATATYPE_NAME.TEXT]: TextDatatypeEditor,
  [DATATYPE_NAME.NUMERIC]: NumericDatatypeEditor,
  [DATATYPE_NAME.DATE]: DateDatatypeEditor
}

export default function Response(
  { id, simple, codeListReference, mandatory, datatype, remove, edit,
    editChooseCodeList,
    changeDatatypeName, changeDatatypeParam, locale, qrId }) {
  const editDatatype = update => edit({ datatype: update })
  const Editor = editors[datatype.typeName]
  return (
    <div className="form-horizontal">
      <div className="form-group">
        <DatatypePicker typeName={datatype.typeName} locale={locale}
          select={changeDatatypeName}/>
      </div>

      <div className="form-group">
        <Editor datatype={datatype}
          edit={changeDatatypeParam} locale={locale} />
        <div className="col-sm-1">
          <button className="btn btn-default" onClick={remove}>
            <span className="glyphicon glyphicon-remove"/>
          </button>
        </div>
      </div>
      <CodeListPicker
        qrId={qrId}
        codeListId={codeListReference}
        responseId={id}
        select={clId => editChooseCodeList(clId)}
        locale={locale} />
    </div>
  );
}

Response.propTypes = {
  id: PropTypes.string.isRequired,
  qrId: PropTypes.string.isRequired,
  simple: PropTypes.bool.isRequired,
  codeListReference: PropTypes.string, // default to null`
  mandatory: PropTypes.bool.isRequired,
  datatype: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  editChooseCodeList: PropTypes.func.isRequired,
  changeDatatypeName: PropTypes.func.isRequired,
  changeDatatypeParam: PropTypes.func.isRequired
}
