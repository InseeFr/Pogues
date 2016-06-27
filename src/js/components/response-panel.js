import React, { PropTypes } from 'react'
import GenericPanel from './generic-panel'
import Response from './response';
import Logger from '../logger/logger';
import { connect } from 'react-redux'
import {
  createResponse, removeResponse, editResponse, changeDatatypeName,
  changeDatatypeParam, editResponseChooseCodeList
} from '../actions/response'

var logger = new Logger('ResponsePanel', 'Components');

function ResponsePanel({ qrId, cmpntId, detailedResponses, removeResponse,
    createResponse,  editResponse, editResponseChooseCodeList,
    changeDatatypeName, changeDatatypeParam,
    locale }) {

  const rspnsEls = detailedResponses.map(
    ({ id, simple, codeListReference, mandatory, datatype }) =>
    <Response key={id} id={id} simple={simple} mandatory={mandatory}
      datatype={datatype} codeListReference={codeListReference}
      qrId={qrId}
      remove={() => removeResponse(id, cmpntId) }
      edit={update => editResponse(id, update)}
      editChooseCodeList={clId => editResponseChooseCodeList(id, clId)}
      changeDatatypeName={typeName => changeDatatypeName(id, typeName)}
      changeDatatypeParam={update => changeDatatypeParam(id, update)}
      locale={locale} /> )

  return <GenericPanel add={() => createResponse(cmpntId)} children={rspnsEls}
    localeAdd={locale.addResponse} localeTitle={locale.responsesEdition}  />
}

ResponsePanel.propTypes = {
  qrId: PropTypes.string.isRequired,
  detailedResponses: PropTypes.array.isRequired,
  removeResponse: PropTypes.func.isRequired,
  createResponse: PropTypes.func.isRequired,
  editResponse: PropTypes.func.isRequired,
  editResponseChooseCodeList: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired
}

const mapStateToProps = (state, { cmpntId, responses }) => ({
  detailedResponses: responses.map(id => state.responseById[id])
})

const mapDispatchToProps = {
  createResponse,
  removeResponse,
  editResponse,
  editResponseChooseCodeList,
  changeDatatypeName,
  changeDatatypeParam
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponsePanel)