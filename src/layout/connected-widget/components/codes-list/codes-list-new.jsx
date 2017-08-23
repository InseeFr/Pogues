import React from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import CodesListEditor from './codes-list-editor';

class CodesListNew extends FormSection {
  static propTypes = {
    optional: PropTypes.bool,
  }
  static defaultProps = {
    name: 'NEW',
    optional: false,
  };
  render() {
    const { optional } = this.props;
    return <CodesListEditor optional={optional} />;
  }
}

export default CodesListNew;
