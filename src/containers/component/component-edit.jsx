import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editComponent } from 'actions/component';
import { setActiveComponent } from 'actions/app-state';
import ComponentNewEdit from 'components/component/component-new-edit';

const mapStateToProps = (state, { questionnaireId, componentId }) => ({
  component: state.appState.componentListByQuestionnaire[questionnaireId][componentId],
  questionnaireId,
});

const mapDispatchToProps = {
  editComponent,
  setActiveComponent,
};

function ComponentEditContainer({
  // eslint-disable-next-line no-shadow
  editComponent,
  component,
  questionnaireId,
  onSuccess,
  onCancel,
}) {
  const submit = values => {
    editComponent(component.id, questionnaireId, { ...values });
    onSuccess();
  };
  const initialValues = {
    initialValues: component,
  };

  return (
    <ComponentNewEdit
      {...initialValues}
      componentId={component.id}
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
