// import { connect } from 'react-redux';
//
// import QuestionnaireItems from '../components/questionnaire-items';
//
// import { dragComponent, removeComponent, duplicateComponent } from 'actions/component';
// import { setSelectedComponentId, loadStatisticalContext, visualizeActiveQuestionnaire } from 'actions/app-state';
// import { loadCampaignsIfNeeded } from 'actions/metadata';
// import { removeQuestionnaire } from 'actions/questionnaire';
//
// // Container
//
// const mapStateToProps = state => ({
//   questionnaire: state.appState.activeQuestionnaire,
//   componentStore: state.appState.activeComponentsById,
//   selectedComponentId: state.appState.selectedComponentId,
//   errorsByCode: state.appState.errorsByCode,
// });
//
// const mapDispatchToProps = {
//   setSelectedComponentId,
//   dragComponent,
//   removeComponent,
//   duplicateComponent,
//   removeQuestionnaire,
//   loadStatisticalContext,
//   loadCampaignsIfNeeded,
//   visualizeActiveQuestionnaire,
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireItems);
