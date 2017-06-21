import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateComponent } from 'actions/component';
import SequenceNewEdit from 'questionnaire/components/component/sequence-new-edit';
import QuestionNewEdit from 'questionnaire/components/component/question-new-edit';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

const mapStateToProps = (state, { componentId }) => ({
  component: state.appState.activeComponentsById[componentId],
});

const mapDispatchToProps = {
  updateComponent,
};

function ComponentEditContainer({ updateComponent, component, onSuccess, onCancel }) {
  const { id, type } = component;

  const submit = values => {
    updateComponent(id, { ...values });
    if (onSuccess) onSuccess();
  };

  const initialValues = {
    initialValues: component,
  };

  const props = {
    edit: true,
    onSubmit: submit,
    onCancel: onCancel,
  };

  if (type === QUESTION) {
    return <QuestionNewEdit {...initialValues} {...props} />;
  }
  return <SequenceNewEdit {...initialValues} {...props} />;
}

ComponentEditContainer.propTypes = {
  updateComponent: PropTypes.func.isRequired,
  component: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

ComponentEditContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentEditContainer);
