// @TODO: It should be divided in container/component

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { QUESTION_TYPE_ENUM } from 'constants/schema';
import ResponseFormatPicker from './editors/response-format-picker';
import SimpleResponseFormatEditor from './editors/response-format-editor-simple';
import SingleResponseFormatEditor from './editors/response-format-editor-single';
import MultipleResponseFormatEditor from './editors/response-format-editor-multiple';
import TableResponseFormatEditor from './editors/response-format-editor-table';
import {
  switchFormat,
  updateFormat,
  newCodeListFormat,
  updateDatatype,
  updateResponse,
  updateMeasure,
  updateMeasureFormat,
  addMeasure,
  removeMeasure,
} from 'actions/response-format';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

const editors = {};
editors[SIMPLE] = SimpleResponseFormatEditor;
editors[SINGLE_CHOICE] = SingleResponseFormatEditor;
editors[MULTIPLE_CHOICE] = MultipleResponseFormatEditor;
editors[TABLE] = TableResponseFormatEditor;

// const mapStateToProps = (state, { questionId }) => ({
//   formats: state.responseFormatById[questionId],
//   locale: state.locale,
// });

const mapStateToProps = (state, { questionId }) => {
  return {
    formats: state.responseFormatById[questionId],
    locale: state.locale,
  };
};

const mapDispatchToProps = {
  switchFormat,
  updateResponse,
  updateFormat,
  updateDatatype,
  newCodeListFormat,
  updateMeasure,
  updateMeasureFormat,
  addMeasure,
  removeMeasure,
};

function ResponseFormatContainer({
  questionId,
  questionnaireId,
  formats,
  switchFormat,
  updateResponse,
  updateFormat,
  newCodeListFormat,
  updateDatatype,
  updateMeasure,
  updateMeasureFormat,
  addMeasure,
  removeMeasure,
  locale,
}) {
  const { type, mandatory } = formats;
  const ResponseFormatEditor = editors[type];
  const format = formats[type];

  return (
    <div className="form-horizontal">
      <div className="form-group">
        <label className="col-sm-3 control-label">
          {locale.responseFormats}
        </label>
        <div className="col-sm-4">
          <ResponseFormatPicker
            types={QUESTION_TYPE_ENUM}
            type={type}
            locale={locale}
            select={type => switchFormat(questionId, type)}
          />
        </div>
      </div>
      <ResponseFormatEditor
        format={format}
        id={questionId}
        qrId={questionnaireId}
        mandatory={mandatory}
        toggleMandatory={() => updateResponse(questionId, { mandatory: !mandatory })}
        updateFormat={update => updateFormat(questionId, update)}
        newCodeListFormat={ctx => newCodeListFormat(questionId, questionnaireId, ctx)}
        updateMeasure={(update, index) => updateMeasure(questionId, update, index)}
        updateDatatype={(update, ctx) => updateDatatype(questionId, update, ctx)}
        updateMeasureFormat={(update, index) => updateMeasureFormat(questionId, update, index)}
        addMeasure={index => addMeasure(questionId, index)}
        removeMeasure={index => removeMeasure(questionId, index)}
        locale={locale}
      />
    </div>
  );
}

ResponseFormatContainer.propTypes = {
  questionId: PropTypes.string.isRequired,
  formats: PropTypes.object.isRequired,
  switchFormat: PropTypes.func.isRequired,
  updateFormat: PropTypes.func.isRequired,
  updateDatatype: PropTypes.func.isRequired,
  newCodeListFormat: PropTypes.func.isRequired,
  updateMeasure: PropTypes.func.isRequired,
  updateMeasureFormat: PropTypes.func.isRequired,
  addMeasure: PropTypes.func.isRequired,
  removeMeasure: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponseFormatContainer);
