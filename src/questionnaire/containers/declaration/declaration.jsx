import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Declaration from 'questionnaire/components/declaration/declaration';

const mapStateToProps = () => {
  const declarations = [];

  return {
    declarations,
  };
};

const mapDispatchToProps = {};

class DeclarationContainer extends Component {
  static propTypes = {
    declarations: PropTypes.array.isRequired,
  };

  componentWillMount() {}

  render() {
    const { declarations } = this.props;
    return <Declaration declarations={declarations} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeclarationContainer);
