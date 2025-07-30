import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import { DIMENSION_TYPE } from '../../../../../constants/pogues-constants';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { OptionalView } from './components/optional-view';
import ResponseFormatTableSecondaryOptional from './table-secondary-optional';

const { SECONDARY: selectorPath } = DIMENSION_TYPE;

function ResponseFormatTableSecondary({ selectorPathParent }) {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <FormSection name={selectorPath}>
      <OptionalView
        name="showSecondaryAxis"
        selectorPath={selectorPathComposed}
        label={Dictionary.addScndAxis}
        checkbox
      >
        <ResponseFormatTableSecondaryOptional
          selectorPath={selectorPathComposed}
        />
      </OptionalView>
    </FormSection>
  );
}

ResponseFormatTableSecondary.propTypes = {
  selectorPathParent: PropTypes.string,
};

ResponseFormatTableSecondary.defaultProps = {
  selectorPathParent: undefined,
};

export default ResponseFormatTableSecondary;
