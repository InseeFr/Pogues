import React from 'react';
import PropTypes from 'prop-types';

import Dictionary from 'utils/dictionary/dictionary';

function searchQuestionnnaireRefRow({ version, id, title, serie, operation, campaign }) {
  return (
    <div>
      <div>{version}</div>
      <div>{id}</div>
      <div>{title}</div>
      <div>{serie}</div>
      <div>{operation}</div>
      <div>{campaign}</div>
      <div>
        <a href="">{Dictionary.actions_reuse}</a>
      </div>
    </div>
  );
}

searchQuestionnnaireRefRow.propTypes = {
  version: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  serie: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  campaign: PropTypes.string.isRequired,
};

export const headers = ['version', 'id', 'title', 'serie', 'operation', 'campaign', 'action'];

export default searchQuestionnnaireRefRow;
