import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createComponent } from 'actions/component';
import { setActiveComponent } from 'actions/app-state';
import ComponentNewEdit from 'components/component/component-new-edit';

const mapDispatchToProps = {
  createComponent,
  setActiveComponent,
};

function ComponentNewContainer({
  // eslint-disable-next-line no-shadow
  createComponent,
  // eslint-disable-next-line no-shadow
  setActiveComponent,
  questionnaireId,
  parentId,
  typeComponent,
  onSuccess,
  onCancel,
}) {
  const submit = values => {
    const { payload: { component } } = createComponent(questionnaireId, parentId, typeComponent, values.label);
    setActiveComponent(component.id);
    onSuccess();
  };

  return <ComponentNewEdit type={typeComponent} onSubmit={submit} onCancel={onCancel} />;
}

ComponentNewContainer.propTypes = {
  createComponent: PropTypes.func.isRequired,
  setActiveComponent: PropTypes.func.isRequired,
  questionnaireId: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  typeComponent: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

ComponentNewContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(undefined, mapDispatchToProps)(ComponentNewContainer);
