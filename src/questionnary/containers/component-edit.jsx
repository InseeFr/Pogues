import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editComponent } from 'actions/component';
import ComponentNewEdit from 'questionnary/components/component-new-edit';

const mapStateToProps = (state, { componentId }) => ({
  component: state.appState.activeComponentsById[componentId],
});

const mapDispatchToProps = {
  editComponent,
};

function ComponentEditContainer({
  // eslint-disable-next-line no-shadow
  editComponent,
  component,
  questionnaireId,
  onSuccess,
  onCancel,
}) {
  const componentId = component.id;

  const submit = values => {
    editComponent(componentId, questionnaireId, { ...values });
    onSuccess();
  };

  const initialValues = {
    initialValues: component,
  };

  return (
    <ComponentNewEdit
      {...initialValues}
      componentId={componentId}
      questionnaireId={questionnaireId}
      edit
      type={component.type}
      onSubmit={submit}
      onCancel={onCancel}
    />
  );
}

ComponentEditContainer.propTypes = {
  editComponent: PropTypes.func.isRequired,
  component: PropTypes.object.isRequired,
  questionnaireId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

ComponentEditContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentEditContainer);
