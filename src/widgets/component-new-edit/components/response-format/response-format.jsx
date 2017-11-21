import React from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { SelectorView, View } from 'widgets/selector-view';
import ResponseFormatSimple from './simple/response-format-simple';
import ResponseFormatSingle from './single/response-format-single';
import ResponseFormatMultiple from './multiple/response-format-multiple';
import ResponseFormatTable from './table/response-format-table';
import Dictionary from 'utils/dictionary/dictionary';
import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

class ResponseFormat extends FormSection {
  static selectorPath = 'responseFormat';
  static propTypes = {
    edit: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    name: 'responseFormat',
  };
  render() {
    let customProps = {
      label: Dictionary.responseFormats,
      selectorPath: ResponseFormat.selectorPath,
    };

    if (!this.props.edit) {
      customProps = {
        ...customProps,
        emptyOption: Dictionary.selectType,
      };
    }

    return (
      <div className="response-format">
        <SelectorView {...customProps}>
          <View key={SIMPLE} value={SIMPLE} label={Dictionary.responseFormatSimple}>
            <ResponseFormatSimple selectorPathParent={ResponseFormat.selectorPath} />
          </View>
          <View key={SINGLE_CHOICE} value={SINGLE_CHOICE} label={Dictionary.responseFormatSingle}>
            <ResponseFormatSingle selectorPathParent={ResponseFormat.selectorPath} />
          </View>
          <View key={MULTIPLE_CHOICE} value={MULTIPLE_CHOICE} label={Dictionary.responseFormatMultiple}>
            <ResponseFormatMultiple selectorPathParent={ResponseFormat.selectorPath} />
          </View>
          <View key={TABLE} value={TABLE} label={Dictionary.responseFormatTable}>
            <ResponseFormatTable selectorPathParent={ResponseFormat.selectorPath} />
          </View>
        </SelectorView>
      </div>
    );
  }
}

export default ResponseFormat;
