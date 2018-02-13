import React from 'react';

import { DEFAULT_FORM_NAME } from 'constants/pogues-constants';
import { storeToArray, nestedStoreToFlat } from 'utils/utils';

/**
 * High order component
 *
 * @param ComponentToWrap
 * @returns <ComponentToWrap />
 */
const withConditions = ComponentToWrap => {
  const withConditionsComponent = props => <ComponentToWrap {...props} />;

  return connect(mapStateToProps(formName))(withConditionsComponent);
};

// Don't use hoc directly in render
export default withConditions;
