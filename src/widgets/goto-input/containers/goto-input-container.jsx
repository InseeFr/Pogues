import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';

import GotoInput from '../components/goto-input';
import { getTargets } from '../utils/goto-input-utils';
import { DEFAULT_FORM_NAME } from '../../../constants/pogues-constants';

// Prop types and default props

const propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string.isRequired,
  componentType: PropTypes.string.isRequired,
};

const defaultProps = {
  formName: DEFAULT_FORM_NAME,
};

// Container

const mapStateToProps = (state, { formName, selectorPath, componentType }) => {
  const selector = formValueSelector(formName);
  const componentsStore = state.appState.activeComponentsById;
  const selectedTarget = selector(state, `${selectorPath}.cible`);
  const { editingComponentId, selectedComponentId } = state.appState;

  return {
    targets: getTargets(
      componentsStore,
      selectedTarget,
      editingComponentId,
      selectedComponentId,
      componentType,
    ),
  };
};

const GotoInputContainer = connect(mapStateToProps)(GotoInput);

GotoInputContainer.propTypes = propTypes;
GotoInputContainer.defaultProps = defaultProps;

export default GotoInputContainer;
