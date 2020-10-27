import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import ResponseFormatTableSecondaryOptional from './table-secondary-optional';
import Dictionary from 'utils/dictionary/dictionary';
import { OptionalView } from 'widgets/optional-view';
import { DIMENSION_TYPE } from 'constants/pogues-constants';

const { SECONDARY } = DIMENSION_TYPE;

class ResponseFormatTableSecondary extends Component {
  static selectorPath = SECONDARY;

  static propTypes = {
    selectorPathParent: PropTypes.string,
  };

  static defaultProps = {
    selectorPathParent: undefined,
  };

  constructor(props) {
    const { selectorPathParent } = props;
    super(props);

    this.selectorPathComposed = selectorPathParent
      ? `${selectorPathParent}.${ResponseFormatTableSecondary.selectorPath}`
      : ResponseFormatTableSecondary.selectorPath;
  }

  render() {
    return (
      <FormSection name={ResponseFormatTableSecondary.selectorPath}>
        <OptionalView
          name="showSecondaryAxis"
          selectorPath={this.selectorPathComposed}
          label={Dictionary.addScndAxis}
          checkbox
        >
          <ResponseFormatTableSecondaryOptional
            selectorPath={this.selectorPathComposed}
          />
        </OptionalView>
      </FormSection>
    );
  }
}

export default ResponseFormatTableSecondary;
