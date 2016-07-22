import React, { PropTypes } from 'react'
import GenericPanel from './generic-panel'
import ResponseFormat from './response-format';
import Logger from '../logger/logger';
import { connect } from 'react-redux'
import {
  switchFormat
} from '../actions/response-format'

var logger = new Logger('ResponsePanel', 'Components');

function ResponseFormatPanel({ id, qrId, format, switchFormat,  locale }) {

  const responseFormatEl =
    <ResponseFormat id={id}
      switchFormat={switchFormat}
      format={format} qrId={qrId} locale={locale} />

  return <GenericPanel add={null}
    children={responseFormatEl}
    localeAdd={locale.addResponse} localeTitle={locale.responsesEdition}  />
}

ResponseFormatPanel.propTypes = {
  qrId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  format: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired
}

const mapStateToProps = (state, { id }) => ({
  // if of the response format is the question id
  format: state.responseFormatById[id]
})

const mapDispatchToProps = {
  switchFormat
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponseFormatPanel)