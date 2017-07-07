import React, { Component } from 'react';
import { FormSection } from 'redux-form';

import ListEntryForm from 'questionnaire/components/list-entry-form';

class ResponseFormatTableMeasures extends FormSection {
  static defaultProps = {
    name: 'AXISMEASURES',
  };
  render() {
    return <ListEntryForm name="measures-entry" />;
  }
}

export default ResponseFormatTableMeasures;
