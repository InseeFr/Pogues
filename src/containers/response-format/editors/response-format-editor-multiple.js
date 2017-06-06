import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VisHintPicker from './vis-hint-picker';
import coupleEditorSelector from './couple-code-list-selector-editor';
import { AXIS } from 'constants/pogues-constants';

const { INFO, MEASURE } = AXIS;

class MultipleResponseFormatEditor extends Component {
  static propTypes = {
    format: PropTypes.object.isRequired,
    updateFormat: PropTypes.func.isRequired,
    newCodeListFormat: PropTypes.func.isRequired,
    updateMeasure: PropTypes.func.isRequired,
    updateMeasureFormat: PropTypes.func.isRequired,
    locale: PropTypes.object.isRequired,
    qrId: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { edited: false, editedMeasure: false };
    this.toggleOrSet = edited =>
      edited !== undefined ? this.setState({ edited }) : this.setState({ edited: !this.state.edited });

    this.toggleOrSetMeasure = edited =>
      edited !== undefined
        ? this.setState({ editedMeasure: edited })
        : this.setState({ editedMeasure: !this.state.editedMeasure });
  }

  render() {
    const {
      format,
      updateFormat,
      newCodeListFormat,
      updateMeasureTable,
      updateMeasureFormatTable,
      locale,
      qrId,
    } = this.props;

    const { infoCodeList, measureCodeList, measureBoolean, measureVisHint } = format;
    const { codeListSelector, codeListEditor } = coupleEditorSelector(
      {
        id: infoCodeList,
        questionnaireId: qrId,
        select: infoCodeList => updateFormat({ infoCodeList }),
        create: () => newCodeListFormat(INFO),
        edited: this.state.edited,
        locale,
      },
      this.toggleOrSet
    );

    const { codeListSelector: codeListSelectorMeasure, codeListEditor: codeListEditorMeasure } = coupleEditorSelector(
      {
        id: measureCodeList,
        questionnaireId: qrId,
        disabled: measureBoolean,
        select: measureCodeList => updateFormat({ measureCodeList }),
        create: () => newCodeListFormat(MEASURE),
        edited: this.state.editedMeasure,
        locale,
      },
      this.toggleOrSetMeasure
    );

    return (
      <div>
        <div className="form-group">
          <label htmlFor="codeList" className="col-sm-5 control-label">
            {locale.infoAxis}
          </label>
          <div className="col-sm-7">
            {codeListSelector}
          </div>
        </div>
        <div>
          {codeListEditor}
        </div>
        <div className="form-group">
          <label htmlFor="visHint" className="col-sm-5 control-label">
            {locale.measureFormat}
          </label>
          <div className="col-sm-7">
            <label className="radio-inline">
              <input
                type="radio"
                checked={!measureBoolean}
                onChange={e => updateFormat({ measureBoolean: !e.target.checked })}
              />
              {locale.codeList}
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                checked={measureBoolean}
                onChange={e => updateFormat({ measureBoolean: e.target.checked })}
              />
              {locale.boolean}
            </label>
          </div>
        </div>
        {!measureBoolean &&
          <div>
            <div className="form-group">
              <label htmlFor="codeList" className="col-sm-5 control-label">
                {locale.measureInfo}
              </label>
              <div className="col-sm-7">
                {codeListSelectorMeasure}
              </div>
            </div>
            {codeListEditorMeasure}
            <VisHintPicker
              visHint={measureVisHint}
              disabled={measureBoolean}
              locale={locale}
              select={measureVisHint => updateFormat({ measureVisHint })}
            />
          </div>}
      </div>
    );
  }
}

export default MultipleResponseFormatEditor;
