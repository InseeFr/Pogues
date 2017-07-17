import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createComponent, orderComponents, updateParentChildren } from 'actions/component';
import { setSelectedComponentId } from 'actions/app-state';
import SequenceNewEdit from 'questionnaire/components/component/sequence-new-edit';
import QuestionNewEdit from 'questionnaire/components/component/question-new-edit';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { defaultResponseFormatForm } from 'utils/model/transformation-entities/response-format';
import { defaultComponentForm } from 'utils/model/transformation-entities/component';

const { QUESTION } = COMPONENT_TYPE;

const mapDispatchToProps = {
  createComponent,
  orderComponents,
  updateParentChildren,
  setSelectedComponentId,
};

function ComponentNewContainer({
  createComponent,
  orderComponents,
  updateParentChildren,
  setSelectedComponentId,
  parentId,
  weight,
  type,
  onSuccess,
  onCancel,
}) {
  const submit = values => {
    createComponent(values, parentId, weight, type).then(updateParentChildren).then(orderComponents).then(result => {
      const { payload: { id } } = result;
      setSelectedComponentId(id);
      if (onSuccess) onSuccess(id);
    });
  };
  let initialValues = { ...defaultComponentForm };

  const props = {
    onSubmit: submit,
    onCancel: onCancel,
  };

  if (type === QUESTION) {
    initialValues = { ...initialValues, responseFormat: { ...defaultResponseFormatForm } };
    return <QuestionNewEdit initialValues={initialValues} {...props} />;
  }

  return <SequenceNewEdit initialValues={initialValues} {...props} />;
}

ComponentNewContainer.propTypes = {
  createComponent: PropTypes.func.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
  weight: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

ComponentNewContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(undefined, mapDispatchToProps)(ComponentNewContainer);
