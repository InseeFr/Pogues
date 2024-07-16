import React from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { SelectorView, View } from '../../../selector-view';
import Dictionary from '../../../../utils/dictionary/dictionary';
import {
  QUESTION_TYPE_ENUM,
  TABS_PATHS,
} from '../../../../constants/pogues-constants';
import ResponseFormatSimple from './simple/response-format-simple';
import ResponseFormatSingle from './single/response-format-single';
import ResponseFormatMultiple from './multiple/response-format-multiple';
import ResponseFormatTable from './table/response-format-table';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE, PAIRING } =
  QUESTION_TYPE_ENUM;
const { RESPONSE_FORMAT } = TABS_PATHS;
const selectorPath = RESPONSE_FORMAT;

function ResponseFormat({ edit, name, addErrors }) {
  let customProps = {
    label: Dictionary.responseFormats,
    selectorPath: selectorPath,
  };

  if (!edit) {
    customProps = {
      ...customProps,
      emptyOption: Dictionary.selectType,
    };
  }

  return (
    <FormSection name={name}>
      <div className="response-format">
        <SelectorView {...customProps}>
          <View
            key={SIMPLE}
            value={SIMPLE}
            label={Dictionary.responseFormatSimple}
          >
            <ResponseFormatSimple selectorPathParent={selectorPath} />
          </View>
          <View
            key={SINGLE_CHOICE}
            value={SINGLE_CHOICE}
            label={Dictionary.responseFormatSingle}
          >
            <ResponseFormatSingle selectorPathParent={selectorPath} />
          </View>
          <View
            key={MULTIPLE_CHOICE}
            value={MULTIPLE_CHOICE}
            label={Dictionary.responseFormatMultiple}
          >
            <ResponseFormatMultiple selectorPathParent={selectorPath} />
          </View>
          <View
            key={TABLE}
            value={TABLE}
            label={Dictionary.responseFormatTable}
          >
            <ResponseFormatTable
              selectorPathParent={selectorPath}
              addErrors={addErrors}
            />
          </View>
          <View
            key={PAIRING}
            value={PAIRING}
            label={Dictionary.responseFormatPairing}
          >
            <ResponseFormatSingle
              selectorPathParent={selectorPath}
              responseFormatType={PAIRING}
            />
          </View>
        </SelectorView>
      </div>
    </FormSection>
  );
}

ResponseFormat.propTypes = {
  edit: PropTypes.bool.isRequired,
  addErrors: PropTypes.func.isRequired,
};

ResponseFormat.defaultProps = {
  name: RESPONSE_FORMAT,
};

export default ResponseFormat;
