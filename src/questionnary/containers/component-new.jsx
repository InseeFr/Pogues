import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createComponent } from 'actions/component';
import { setSelectedComponent } from 'actions/app-state';
import ComponentNewEdit from 'questionnary/components/component-new-edit';

const mapDispatchToProps = {
  createComponent,
  setSelectedComponent,
};

function ComponentNewContainer({
  createComponent,
  setSelectedComponent,
  parentId,
  weight,
  typeComponent,
  onSuccess,
  onCancel,
}) {
  const submit = values => {
    const { payload: { component } } = createComponent(parentId, weight, typeComponent, values.label);
    setSelectedComponent(component.id);
    if (onSuccess) onSuccess(component.id);
  };

  return <ComponentNewEdit type={typeComponent} onSubmit={submit} onCancel={onCancel} />;
}

ComponentNewContainer.propTypes = {
  createComponent: PropTypes.func.isRequired,
  setSelectedComponent: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  typeComponent: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

ComponentNewContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(undefined, mapDispatchToProps)(ComponentNewContainer);
