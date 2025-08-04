import { connect } from 'react-redux';

import { clearSearchResult } from '../../actions/search';
import PageSearchQuestionnaire from './page-search-questionnaire';

// Container

const mapDispatchToProps = { clearSearchResult };

export default connect(undefined, mapDispatchToProps)(PageSearchQuestionnaire);
