import React, { PropTypes } from 'react'
import GenericPanel from './generic-panel'
import ResponseFormat from './response-format';

export default function ResponseFormatPanel({ id, qrId, locale }) {

  const responseFormatEl =
    <ResponseFormat id={id} qrId={qrId} />

  return <GenericPanel add={null}
    children={responseFormatEl}
    localeAdd={locale.addResponse} localeTitle={locale.responsesEdition}  />
}

ResponseFormatPanel.propTypes = {
  qrId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  locale: PropTypes.object.isRequired
}
