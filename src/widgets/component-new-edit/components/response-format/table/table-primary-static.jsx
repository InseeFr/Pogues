import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import { DIMENSION_FORMATS } from '../../../../../constants/pogues-constants';
import { CodesLists } from '../../../../codes-lists';

const { CODES_LIST: selectorPath } = DIMENSION_FORMATS;

/**
 * In a static table, we must provide a code list that will determinate the
 * size of the table.
 */
const ResponseFormatTablePrincipalStatic = ({ selectorPathParent }) => {
  const selectorPathComposed = selectorPathParent
    ? `${selectorPathParent}.${selectorPath}`
    : selectorPath;

  return (
    <div className="axis-primary__panel">
      <FormSection name={selectorPath}>
        <CodesLists selectorPathParent={selectorPathComposed} />
      </FormSection>
    </div>
  );
};

ResponseFormatTablePrincipalStatic.propTypes = {
  selectorPathParent: PropTypes.string,
};

ResponseFormatTablePrincipalStatic.defaultProps = {
  selectorPathParent: undefined,
};

export default ResponseFormatTablePrincipalStatic;
