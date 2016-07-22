import React, { PropTypes } from 'react'
import GenericPanel from './generic-panel'
import ResponseFormat from './response-format';
import Logger from '../logger/logger';
import { connect } from 'react-redux'
import {
  createResponse, removeResponse, editResponse, changeDatatypeName,
  changeDatatypeParam, editResponseChooseCodeList
} from '../actions/response'

var logger = new Logger('ResponsePanel', 'Components');

function ResponseFormatPanel({ qrId, cmpntId, responseFormat, removeResponse,
    createResponse,  editResponse, editResponseChooseCodeList,
    changeDatatypeName, changeDatatypeParam,
    locale }) {

  const {
    id, simple, codeListReference, mandatory, datatype
  } = responseFormat
  const rspnsEls =
    <ResponseFormat key={id} id={id} simple={simple} mandatory={mandatory}
      datatype={datatype} codeListReference={codeListReference}
      qrId={qrId}
      remove={() => removeResponse(id, cmpntId) }
      edit={update => editResponse(id, update)}
      editChooseCodeList={clId => editResponseChooseCodeList(id, clId)}
      changeDatatypeName={typeName => changeDatatypeName(id, typeName)}
      changeDatatypeParam={update => changeDatatypeParam(id, update)}
      locale={locale} />

  return <GenericPanel add={() => createResponse(cmpntId)} children={rspnsEls}
    localeAdd={locale.addResponse} localeTitle={locale.responsesEdition}  />
}

ResponseFormatPanel.propTypes = {
  qrId: PropTypes.string.isRequired,
  responseFormat: PropTypes.object.isRequired,
  removeResponse: PropTypes.func.isRequired,
  createResponse: PropTypes.func.isRequired,
  editResponse: PropTypes.func.isRequired,
  editResponseChooseCodeList: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}

const mapStateToProps = (state, { cmpntId, responseFormat }) => ({
  responseFormat: state.responseFormatById[responseFormat]
})

const mapDispatchToProps = {
  createResponse,
  removeResponse,
  editResponse,
  editResponseChooseCodeList,
  changeDatatypeName,
  changeDatatypeParam
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponseFormatPanel)