import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';

import SearchInput from 'search-questionnaire/components/search-input';
import { loadQuestionnairesFromRef } from 'actions/questionnaire-list';

const mapStateToProps = state => {
  const selector = formValueSelector('statistical-context');
  return {
    selectedSerie: selector(state, 'serie'),
    selectedOperation: selector(state, 'operation'),
    selectedCampaign: selector(state, 'campaign'),
  };
};

const mapDispatchToProps = {
  loadQuestionnairesFromRef,
};

class SearchInputContainer extends Component {
  static propTypes = {
    selectedSerie: PropTypes.string,
    selectedOperation: PropTypes.string,
    selectedCampaign: PropTypes.string,
    loadQuestionnairesFromRef: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedSerie: '',
    selectedOperation: '',
    selectedCampaign: '',
  };

  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
  }

  search(q) {
    const { selectedSerie, selectedOperation, selectedCampaign } = this.props;
    this.props.loadQuestionnairesFromRef(q, selectedSerie, selectedOperation, selectedCampaign);
  }

  render() {
    return <SearchInput search={this.search} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputContainer);
