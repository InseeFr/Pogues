import React from 'react';
import PropTypes from 'prop-types';

function searchQuestionnnaireRefRow({ version, name, serie, operation, campaign }) {
  return (
    <div>
      <div>{version}</div>
      <div>{name}</div>
      <div>{serie}</div>
      <div>{operation}</div>
      <div>{campaign}</div>
    </div>
  );
}

searchQuestionnnaireRefRow.propTypes = {
  version: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  serie: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  campaign: PropTypes.string.isRequired,
};

export const headers = ['Version', 'Name', 'Serie', 'Operation', 'Campaign'];

export default searchQuestionnnaireRefRow;
