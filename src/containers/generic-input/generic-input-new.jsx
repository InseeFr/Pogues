import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createComponent } from 'actions/_component';
import { setLastComponentEdited } from 'actions/_app-state';
import GenericInputNew from 'components/generic-input/generic-input-new';

const mapStateToProps = state => ({
  locale: state.locale,
});

const mapDispatchToProps = {
  createComponent,
  setLastComponentEdited,
};

function GenericInputNewContainer({
  // eslint-disable-next-line no-shadow
  createComponent,
  // eslint-disable-next-line no-shadow
  setLastComponentEdited,
  locale,
  questionnaireId,
  parentId,
  typeComponent,
  onSuccess,
  onCancel,
}) {
  const submit = values => {
    const { payload: { component } } = createComponent(questionnaireId, parentId, typeComponent, values.label);
    setLastComponentEdited(questionnaireId, component.id);
    onSuccess();
  };

  return <GenericInputNew locale={locale} onSubmit={submit} onCancel={onCancel} />;
}

GenericInputNewContainer.propTypes = {
  createComponent: PropTypes.func.isRequired,
  setLastComponentEdited: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  questionnaireId: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  typeComponent: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

GenericInputNewContainer.defaultProps = {
  onSuccess: undefined,
  onCancel: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(GenericInputNewContainer);
