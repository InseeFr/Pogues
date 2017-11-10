import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, FormSection } from 'redux-form';

import CodesListsCodesContainer from '../containers/codes-lists-codes-container';

import { WIDGET_CODES_LISTS } from 'constants/dom-constants';
import { CODES_LIST_INPUT_ENUM, CODES_LISTS_PANELS } from 'constants/pogues-constants';
import Dictionary from 'utils/dictionary/dictionary';
import Input from 'forms/controls/input';
import ListRadios from 'forms/controls/list-radios';
import Select from 'forms/controls/select';
import GenericOption from 'forms/controls/generic-option';
import { SearchCodesLists } from 'widgets/search-codes-lists';
import { storeToArray } from 'utils/utils';

const { COMPONENT_CLASS, PANEL_CLASS, PANEL_SELECTOR_CLASS } = WIDGET_CODES_LISTS;
const { NEW, REF, QUEST } = CODES_LIST_INPUT_ENUM;

// Utils

function getSelectorOptions(panels) {
  return panels.map(p => ({
    label: Dictionary[p.dictionary],
    value: p.value,
  }));
}

// PropTypes and defaultProps

export const propTypes = {
  selectorPath: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  activePanel: PropTypes.string,
  currentId: PropTypes.string,
  codesListsStore: PropTypes.object,
  currentCodesListsStore: PropTypes.object,
  change: PropTypes.func.isRequired,
  arrayPush: PropTypes.func.isRequired,
  arrayRemoveAll: PropTypes.func.isRequired,
  clearSearchResult: PropTypes.func.isRequired,
};

export const defaultProps = {
  activePanel: undefined,
  currentId: '',
  codesListsStore: {},
  currentCodesListsStore: {},
};

// Componet

class CodesList extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentWillMount() {
    const { change, formName, path, currentId, clearSearchResult, codesListsStore } = this.props;
    let activePanel = NEW;

    clearSearchResult();

    if (codesListsStore[currentId]) activePanel = QUEST;

    change(formName, `${path}panel`, activePanel);
  }

  componentWillReceiveProps(nextProps) {
    const { change, arrayPush, arrayRemoveAll, formName, path, currentId, codesListsStore } = this.props;

    if (nextProps.currentId === '' && nextProps.currentId !== currentId) {
      change(formName, `${path}id`, '');
      change(formName, `${path}label`, '');
      arrayRemoveAll(formName, `${path}codes`);
    }

    if (nextProps.currentId !== '' && nextProps.currentId !== currentId) {
      const codesStore = codesListsStore[nextProps.currentId].codes;

      change(formName, `${path}label`, codesListsStore[nextProps.currentId].label);
      Object.keys(codesStore).forEach(key => {
        arrayPush(formName, `${path}codes`, codesStore[key]);
      });
    }
  }

  render() {
    const { selectorPath, path, formName, activePanel, currentCodesListsStore } = this.props;

    console.log(currentCodesListsStore);

    return (
      <FormSection name={selectorPath} className={COMPONENT_CLASS}>
        {/* Selector panel */}
        <div className={PANEL_SELECTOR_CLASS}>
          <Field name="panel" component={ListRadios} label={Dictionary.selectCodesListType} required>
            {getSelectorOptions(CODES_LISTS_PANELS).map(panel => (
              <GenericOption key={panel.value} value={panel.value}>
                {panel.label}
              </GenericOption>
            ))}
          </Field>
        </div>

        {activePanel && (
          <div className={`${PANEL_CLASS} ${PANEL_CLASS}-${activePanel}`}>
            {activePanel === REF && <SearchCodesLists path={path} />}
            {activePanel === QUEST && (
              <Field name="id" component={Select} label={Dictionary.selectCodesListType} required>
                <GenericOption key="" value="">
                  {Dictionary.selectCodesListType}
                </GenericOption>
                {storeToArray(currentCodesListsStore).map(cl => (
                  <GenericOption key={cl.id} value={cl.id}>
                    {cl.label}
                  </GenericOption>
                ))}
              </Field>
            )}
            {activePanel === NEW && (
              <div>
                <Field name="label" component={Input} type="text" label={Dictionary.newCl} focusOnInit required />
                <FieldArray
                  name="codes"
                  component={CodesListsCodesContainer}
                  inputCodePath={`${path}input-code.`}
                  formName={formName}
                />
              </div>
            )}
          </div>
        )}
      </FormSection>
    );
  }
}

export default CodesList;
