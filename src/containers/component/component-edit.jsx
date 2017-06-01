import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editComponent } from 'actions/component';
import { setActiveComponent } from 'actions/app-state';
import ComponentNewEdit from 'components/component/component-new-edit';

const mapStateToProps = (state, { questionnaireId, componentId }) => ({
  locale: state.locale,
  component: state.appState.componentListByQuestionnaire[questionnaireId][componentId],
});

const mapDispatchToProps = {
  editComponent,
  setActiveComponent,
};

function ComponentEditContainer({
  // eslint-disable-next-line no-shadow
  editComponent,
  locale,
  component,
  onSuccess,
  onCancel,
}) {
  const submit = values => {
    editComponent(component.id, { ...values });
    onSuccess();
  };
  const initialValues = {
    initialValues: component,
  };

  return (
    <ComponentNewEdit {...initialValues} locale={locale} edit type={component.type} onSubmit={submit} onCancel={onCancel} />
  );
}

ComponentEditContainer.propTypes = {
  editComponent: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

ComponentEditContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentEditContainer);
