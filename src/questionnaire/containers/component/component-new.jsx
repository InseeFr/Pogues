import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createComponent } from 'actions/component';
import { setSelectedComponentId } from 'actions/app-state';
import SequenceNewEdit from 'questionnaire/components/component/sequence-new-edit';
import QuestionNewEdit from 'questionnaire/components/component/question-new-edit';
import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { QUESTION_TYPE_ENUM } from 'constants/schema';
import { defaultResponseFormatSimpleForm } from 'utils/model/transformation-entities/response-format-simple';
import { defaultResponseFormatSingleForm } from 'utils/model/transformation-entities/response-format-single';
import { defaultResponseFormatMultipleForm } from 'utils/model/transformation-entities/response-format-multiple';
import { defaultResponseFormatTableForm } from 'utils/model/transformation-entities/response-format-table';

const { SIMPLE } = QUESTION_TYPE_ENUM;
const { QUESTION } = COMPONENT_TYPE;

const mapDispatchToProps = {
  createComponent,
  setSelectedComponentId,
};

function ComponentNewContainer({
  createComponent,
  setSelectedComponentId,
  parentId,
  weight,
  type,
  onSuccess,
  onCancel,
}) {
  const submit = values => {
    const { payload: { id } } = createComponent(values, parentId, weight, type);
    setSelectedComponentId(id);
    if (onSuccess) onSuccess(id);
  };

  const props = {
    onSubmit: submit,
    onCancel: onCancel,
  };

  if (type === QUESTION) {
    const questionInitialValues = {
      initialValues: {
        responseFormat: {
          ...defaultResponseFormatSimpleForm,
          ...defaultResponseFormatSingleForm,
          ...defaultResponseFormatMultipleForm,
          ...defaultResponseFormatTableForm,
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
