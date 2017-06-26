import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateComponent } from 'actions/component';
import SequenceNewEdit from 'questionnaire/components/component/sequence-new-edit';
import QuestionNewEdit from 'questionnaire/components/component/question-new-edit';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { getFormFromComponent } from 'utils/model/form-state-utils';

const { QUESTION } = COMPONENT_TYPE;

const mapStateToProps = (state, { componentId }) => ({
  component: state.appState.activeComponentsById[componentId],
  activeCodeLists: state.appState.activeCodeListsById,
});

const mapDispatchToProps = {
  updateComponent,
};

function ComponentEditContainer({ updateComponent, component, activeCodeLists, onSuccess, onCancel }) {
  const { type } = component;

  const submit = values => {
    updateComponent(values, component.id, component.parent, component.weight, component.type);
    if (onSuccess) onSuccess();
  };

  const initialValues = {
    initialValues: getFormFromComponent(component, activeCodeLists),
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
  activeCodeLists: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

ComponentEditContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentEditContainer);
