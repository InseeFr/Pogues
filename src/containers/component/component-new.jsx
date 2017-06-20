import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createComponent } from 'actions/component';
import { setSelectedComponentId } from 'actions/app-state';
import SequenceNewEdit from 'components/component/sequence-new-edit';
import QuestionNewEdit from 'components/component/question-new-edit';
import { COMPONENT_TYPE, DATATYPE_NAME } from 'constants/pogues-constants';
import { QUESTION_TYPE_ENUM } from 'constants/schema';

const { SIMPLE } = QUESTION_TYPE_ENUM;
const { QUESTION } = COMPONENT_TYPE;
const { DATE } = DATATYPE_NAME;

const mapDispatchToProps = {
  createComponent,
  setSelectedComponentId,
};

function ComponentNewContainer({ createComponent, setSelectedComponentId, parent, weight, type, onSuccess, onCancel }) {
  const submit = values => {
    const { payload: component } = createComponent({ ...values, parent, weight, type });
    setSelectedComponentId(component.id);
    if (onSuccess) onSuccess(component.id);
  };

  const props = {
    onSubmit: submit,
    onCancel: onCancel,
  };

  if (type === QUESTION) {
    const questionInitialValues = {
      initialValues: {
        responseFormat: {
          [SIMPLE]: {
            mandatory: false,
            type: DATE,
          },
          type: SIMPLE,
        },
      },
    };
    return <QuestionNewEdit {...questionInitialValues} {...props} />;
  }
  return <SequenceNewEdit {...props} />;
}

ComponentNewContainer.propTypes = {
  createComponent: PropTypes.func.isRequired,
  setSelectedComponentId: PropTypes.func.isRequired,
  parent: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

ComponentNewContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(undefined, mapDispatchToProps)(ComponentNewContainer);
