/* eslint-disable react/prop-types */
import React from 'react';
import { validateXpath } from '../../jison';

/**
 * High order component
 *
 * @param ComponentToWrap
 * @returns <div><ComponentToWrap props.meta.warning=validateXPath(input.value) /></div>
 */
const withXPathValidation = ComponentToWrap => props => {
  const xPathIsInvalid = validateXpath(props.input.value);
  let childProps;
  if (xPathIsInvalid) {
    const warningsMessage = (
      <div>
        {xPathIsInvalid.split('\n').map(m => (
          <div key={m}>{m}</div>
        ))}
      </div>
    );
    childProps = { ...props, meta: { ...props.meta, error: warningsMessage } };
  } else {
    childProps = props;
  }
  return (
    <div>
      <ComponentToWrap {...childProps} />
    </div>
  );
};

// Don't use hoc directly in render, define them outside
export default withXPathValidation;
