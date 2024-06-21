/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import GenericOption from '../../../forms/controls/generic-option';
import Select from '../../../forms/controls/select';
import Dictionary from '../../../utils/dictionary/dictionary';

export const FilterLoopMembers = ({
  componentsStore,
  componentType,
  InitialMember,
}) => {
  const {
    SEQUENCE,
    SUBSEQUENCE,
    FILTER,
    QUESTION,
    ROUNDABOUT,
    EXTERNAL_ELEMENT,
  } = COMPONENT_TYPE;

  const filterMinimumWeight = (store, initial) => {
    const firstComponent = Object.values(store)
      .filter(
        component =>
          component.type === FILTER &&
          component.type === initial.type &&
          store[component.initialMember].weight < initial.weight &&
          store[component.finalMember].weight > initial.weight,
      )
      .reduce(
        (min, p) =>
          store[p.finalMember].weight < store[min.finalMember].weight ? p : min,
        999999999,
      );
    if (firstComponent === 999999999) return undefined;
    return firstComponent;
  };

  const getFinalOptions = store => {
    const componentinitial = Object.values(store).filter(
      component => component.id === InitialMember,
    );
    if (!InitialMember || componentinitial.length === 0)
      return (
        <GenericOption key="emptyFinal" value="">
          empty
        </GenericOption>
      );
    if (filterMinimumWeight(store, componentinitial[0])) {
      return Object.values(store)
        .filter(
          component =>
            component.type === componentinitial[0].type &&
            component.weight >= componentinitial[0].weight &&
            component.weight <=
              filterMinimumWeight(store, componentinitial[0]) &&
            component.parent === componentinitial[0].parent &&
            component.id !== 'idendquest',
        )
        .map(element => {
          return (
            <GenericOption key={`final-'${element.id}`} value={element.id}>
              {element.name}
            </GenericOption>
          );
        });
    }
    return Object.values(store)
      .filter(
        component =>
          (component.type === componentinitial[0].type ||
            (component.type === EXTERNAL_ELEMENT &&
              componentinitial[0].type === SEQUENCE) ||
            (component.type === SEQUENCE &&
              componentinitial[0].type === EXTERNAL_ELEMENT)) &&
          component.weight >= componentinitial[0].weight &&
          component.parent === componentinitial[0].parent &&
          component.id !== 'idendquest',
      )
      .map(element => {
        return (
          <GenericOption key={`final-'${element.id}`} value={element.id}>
            {element.name}
          </GenericOption>
        );
      });
  };

  const optionsInitial = type => {
    return Object.values(componentsStore)
      .filter(
        component =>
          (component.type === SEQUENCE && component.id !== 'idendquest') ||
          component.type === SUBSEQUENCE ||
          component.type === EXTERNAL_ELEMENT ||
          (type === FILTER && component.type === QUESTION),
      )
      .map(element => {
        return (
          <GenericOption key={`initial-${element.id}`} value={element.id}>
            {element.name}
          </GenericOption>
        );
      });
  };

  return (
    <>
      <Field
        name="initialMember"
        component={Select}
        label={Dictionary.InitialMembre}
        disabled={componentType === ROUNDABOUT}
        required
      >
        <GenericOption key="selectFirst" value="">
          {Dictionary.selectInitialMembre}
        </GenericOption>
        {optionsInitial(componentType)}
      </Field>
      <Field
        name="finalMember"
        component={Select}
        label={Dictionary.FinalMembre}
        disabled={!InitialMember}
        required
      >
        <GenericOption key="selectLast" value="">
          {Dictionary.selectFinalMembre}
        </GenericOption>
        {getFinalOptions(componentsStore)}
      </Field>
    </>
  );
};

FilterLoopMembers.propTypes = {
  componentsStore: PropTypes.object,
  componentType: PropTypes.string.isRequired,
  InitialMember: PropTypes.string,
};

FilterLoopMembers.defaultProps = {
  InitialMember: undefined,
};
