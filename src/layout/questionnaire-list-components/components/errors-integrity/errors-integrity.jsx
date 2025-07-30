// @TODO: Scroll on select error
import { Component } from 'react';

import PropTypes from 'prop-types';

import { getIntegrityErrors } from '../../../../utils/integrity/utils';

// Utils

function renderComponentsErrors(errorsIntegrity, componentsStore) {
  // We are testing if the component exists in the active components store
  return Object.keys(errorsIntegrity)
    .filter((componentId) => componentsStore[componentId])
    .reduce((acc, componentId) => {
      const integrityErrors = getIntegrityErrors(errorsIntegrity[componentId]);

      if (integrityErrors.length > 0) {
        const componentErrorsOutput = (
          <li key={componentId}>
            <span>{componentsStore[componentId].name}</span>
            <ul>
              {integrityErrors.map((e, index) => (
                <li key={index}>{e}</li>
              ))}
            </ul>
          </li>
        );

        return [...acc, componentErrorsOutput];
      }

      return acc;
    }, []);
}

// Prop types and default props

const propTypes = {
  errorsIntegrity: PropTypes.object,
  componentsStore: PropTypes.object.isRequired,
  // setSelectedComponentId: PropTypes.func.isRequired,
};

const defaultProps = {
  errorsIntegrity: {},
};

// Component

class ErrorsIntegrity extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      expanded: [],
    };

    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand(key) {
    if (this.state.expanded.indexOf(key) < 0) {
      this.setState((prevState) => ({
        expanded: [...prevState.expanded, key],
      }));
    } else {
      this.setState((prevState) => ({
        expanded: prevState.expanded.filter((k) => k !== key),
      }));
    }
  }

  render() {
    const { errorsIntegrity, componentsStore } = this.props;
    const componentsErrors = renderComponentsErrors(
      errorsIntegrity,
      componentsStore,
    );

    return (
      <div id="errors-integrity">
        {componentsErrors.length > 0 && (
          <div className="errors-integrity__inner">
            <div className="errors-integrity__alert">
              <div className="alert-icon big">
                <div className="alert-triangle" />!
              </div>
            </div>
            <div className="errors-integrity__list">
              <ul>{componentsErrors}</ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ErrorsIntegrity;
