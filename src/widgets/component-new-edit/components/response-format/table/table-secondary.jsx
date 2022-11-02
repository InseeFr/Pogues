import React from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import ResponseFormatTableSecondaryOptional from './table-secondary-optional';
import Dictionary from 'utils/dictionary/dictionary';
import { OptionalView } from 'widgets/optional-view';
import { DIMENSION_TYPE } from 'constants/pogues-constants';

const { SECONDARY } = DIMENSION_TYPE;
const selectorPath = SECONDARY;

function ResponseFormatTableSecondary({ selectorPathParent }) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath}>
      <OptionalView
        name="showSecondaryAxis"
        selectorPath={selectorPathComposed}
        label={Dictionary.addScndAxis}
        checkbox
      >
        <ResponseFormatTableSecondaryOptional
          selectorPath={selectorPathComposed}
        />
      </OptionalView>
    </FormSection>
  );
}

ResponseFormatTableSecondary.propTypes = {
  selectorPathParent: PropTypes.string,
};

ResponseFormatTableSecondary.defaultProps = {
  selectorPathParent: undefined,
};

export default ResponseFormatTableSecondary;
