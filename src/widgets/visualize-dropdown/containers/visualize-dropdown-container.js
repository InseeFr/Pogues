import { connect } from 'react-redux';

import VisualizeDropdown from '../components/visualize-dropdown';

const mapStateToProps = state => ({
  questionnaireId: state.appState.activeQuestionnaire.id,
});

const VisualizeDropdownContainer = connect(mapStateToProps)(VisualizeDropdown);

export default VisualizeDropdownContainer;
