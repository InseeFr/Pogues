import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TABS_PATHS } from '../../constants/pogues-constants';
import Tabs from './tabs';

// Utils

function getvalidationErrorsByTab(numErrorsByTab, validation) {
  Object.keys(validation).forEach((path) => {
    const matches = path.match(/^(.+?)\./);

    if (matches) {
      numErrorsByTab[matches[1]] += 1;
    }
  });

  return numErrorsByTab;
}

function getIntegrityErrorsByTab(numErrorsByTab, integrity) {
  Object.keys(integrity)
    .reduce((acc, key) => {
      return [...acc, ...integrity[key]];
    }, [])
    .filter((e) => e.path)
    .forEach((e) => {
      const matches = e.path.match(/^(.+?)\./);

      if (matches) {
        numErrorsByTab[matches[1]] += 1;
      }
    });

  return numErrorsByTab;
}

function getNumErrorsByTab(integrity = {}, validationErrors = {}) {
  let numErrorsByTab = Object.keys(TABS_PATHS).reduce((acc, key) => {
    return {
      ...acc,
      [TABS_PATHS[key]]: 0,
    };
  }, {});

  numErrorsByTab = getvalidationErrorsByTab(numErrorsByTab, validationErrors);
  numErrorsByTab = getIntegrityErrorsByTab(numErrorsByTab, integrity);

  return numErrorsByTab;
}

// Prop types and default props

const propTypes = {
  children: PropTypes.array.isRequired,
  componentId: PropTypes.string,
};

const defaultProps = {
  componentId: '',
};

// Container

const mapStateToProps = (state, { componentId }) => {
  const integrityErrors = state.errors.errorsIntegrity[componentId];
  const validationErrors = state.errors.errorsValidation;

  return {
    errorsByTab: getNumErrorsByTab(integrityErrors, validationErrors),
  };
};

const mapDispatchToProps = {};

const TabsContainer = connect(mapStateToProps, mapDispatchToProps)(Tabs);

TabsContainer.propTypes = propTypes;
TabsContainer.defaultProps = defaultProps;

export default TabsContainer;
