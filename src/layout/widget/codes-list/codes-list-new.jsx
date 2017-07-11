import React from 'react';
import { FormSection } from 'redux-form';

import CodesListEditor from './codes-list-editor';

class CodesListNew extends FormSection {
  static defaultProps = {
    name: 'NEW',
  };
  render() {
    return <CodesListEditor />;
  }
}

export default CodesListNew;
