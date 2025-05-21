import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, change, formValueSelector } from 'redux-form';

import { QUESTION_TYPE_ENUM } from '../../../../../constants/pogues-constants';
import { RichEditorWithVariable } from '../../../../../forms/controls/control-with-suggestions';
import GenericOption from '../../../../../forms/controls/generic-option';
import ListRadios from '../../../../../forms/controls/list-radios';
import { toolbarConfigTooltip } from '../../../../../forms/controls/rich-textarea';
import Dictionary from '../../../../../utils/dictionary/dictionary';
import { SelectorView, View } from '../../../../selector-view';
import ResponseFormatSimple from '../simple/response-format-simple';
import ResponseFormatSingle from '../single/response-format-single';

const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;

function InputMeasure({
  selectorPath,
  disableSetConditionFilter = false,
  hasFilter,
  setConditionFilter,
  isReadOnly = false,
  setConditionReadOnly,
}) {
  const handleFilterChange = () => {
    setConditionFilter(undefined);
  };
  const handleReadOnlyChange = () => {
    setConditionReadOnly(undefined);
  };

  return (
    <div>
      <Field
        name="label"
        component={RichEditorWithVariable}
        label={Dictionary.measureLabel}
        toolbar={toolbarConfigTooltip}
        required
      />
      <SelectorView label={Dictionary.typeMeasure} selectorPath={selectorPath}>
        <View
          key={SIMPLE}
          value={SIMPLE}
          label={Dictionary.responseFormatSimple}
        >
          <ResponseFormatSimple
            selectorPathParent={selectorPath}
            showMandatory={false}
          />
        </View>
        <View
          key={SINGLE_CHOICE}
          value={SINGLE_CHOICE}
          label={Dictionary.responseFormatSingle}
        >
          <ResponseFormatSingle
            selectorPathParent={selectorPath}
            showMandatory={false}
            allowPrecision={false}
            allowFilter={false}
            disableSetArbitrary={true}
          />
        </View>
      </SelectorView>
      {!disableSetConditionFilter && (
        <>
          <Field
            name="hasFilter"
            component={ListRadios}
            label={Dictionary.filteredCells}
            required
            // Reset condition filter to undefined value on change
            onChange={handleFilterChange}
            // Convert string "true"/"false" to boolean true/false when storing in Redux form
            parse={(value) => value === 'true'}
            // Convert true/false/undefined to string "true"/"false" when displaying the form
            format={(value) => (value === true ? 'true' : 'false')}
          >
            <GenericOption value="true">{Dictionary.yes}</GenericOption>
            <GenericOption value="false">{Dictionary.no}</GenericOption>
          </Field>
          {hasFilter && (
            <Field
              name="conditionFilter"
              component={RichEditorWithVariable}
              label={Dictionary.conditionFilter}
              toolbar={toolbarConfigTooltip}
            />
          )}
        </>
      )}
      <Field
        name="isReadOnly"
        component={ListRadios}
        label={Dictionary.readOnlyCells}
        required
        // Reset condition filter to undefined value on change
        onChange={handleReadOnlyChange}
        // Convert string "true"/"false" to boolean true/false when storing in Redux form
        parse={(value) => value === 'true'}
        // Convert true/false/undefined to string "true"/"false" when displaying the form
        format={(value) => (value === true ? 'true' : 'false')}
      >
        <GenericOption value="true">{Dictionary.yes}</GenericOption>
        <GenericOption value="false">{Dictionary.no}</GenericOption>
      </Field>
      {isReadOnly && (
        <Field
          name="conditionReadOnly"
          component={RichEditorWithVariable}
          label={Dictionary.conditionReadOnly}
          toolbar={toolbarConfigTooltip}
        />
      )}
    </div>
  );
}

InputMeasure.propTypes = {
  selectorPath: PropTypes.string.isRequired,
  disableSetConditionFilter: PropTypes.bool,
  hasFilter: PropTypes.bool,
  setConditionFilter: PropTypes.func,
  isReadOnly: PropTypes.bool,
  setConditionReadOnly: PropTypes.func,
};

// Container
const mapStateToProps = (state, { selectorPath }) => {
  const selector = formValueSelector('component');
  return {
    hasFilter: selector(state, `${selectorPath}.hasFilter`),
    conditionFilter: selector(state, `${selectorPath}.conditionFilter`),
    isReadOnly: selector(state, `${selectorPath}.isReadOnly`),
    conditionReadOnly: selector(state, `${selectorPath}.conditionReadOnly`),
  };
};

// Dispatch actions to change form values
const mapDispatchToProps = (dispatch, { selectorPath }) => ({
  setConditionFilter: (value) =>
    dispatch(change('component', `${selectorPath}.conditionFilter`, value)),
  setConditionReadOnly: (value) =>
    dispatch(change('component', `${selectorPath}.conditionReadOnly`, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputMeasure);
