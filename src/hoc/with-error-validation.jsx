/* eslint-disable react/prop-types */
import React from 'react';

/**
 * High order component
 *
 * @param ComponentToWrap
 * @param validate
 * @param schema
 * @returns <div><ComponentToWrap props.meta.error=withCodeValidation(input.value) /></div>
 */
const withErrorValidation = (ComponentToWrap, validate, schema) => props => {
  let childProps = props;

  const error = validate(props, props.path, schema);

  if (error.length > 0) {
    childProps = { ...props, meta: { ...props.meta, error } };
  }

  return (
    <div>
      <ComponentToWrap {...childProps} />
    </div>
  );
};

// Don't use hoc directly in render, define them outside
export default withErrorValidation;
