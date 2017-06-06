import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VisHintPicker from './vis-hint-picker';
import coupleEditorSelector from './couple-code-list-selector-editor';
import SpecialCode from './special-code';

class SingleResponseFormatEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { edited: false };
    this.toggleOrSet = edited =>
      edited !== undefined ? this.setState({ edited }) : this.setState({ edited: !this.state.edited });
  }

  render() {
    const { format, mandatory, toggleMandatory, updateFormat, newCodeListFormat, locale, qrId } = this.props;
    const {
      codeListReference,
      visHint,
      hasSpecialCode,
      specialLabel,
      specialCode,
      specialUiBehaviour,
      specialFollowUpMessage,
    } = format;

    const special = {
      hasSpecialCode,
      label: specialLabel,
      code: specialCode,
      behaviour: specialUiBehaviour,
      message: specialFollowUpMessage,
    };
    const { codeListSelector, codeListEditor } = coupleEditorSelector(
      {
        id: codeListReference,
        questionnaireId: qrId,
        select: codeListReference => updateFormat({ codeListReference }),
        create: () => newCodeListFormat(),
        edited: this.state.edited,
        locale,
      },
      this.toggleOrSet
    );

    // TODO pass a dedicated prop to know if we are within a table response
    // format editor
    const notATable = mandatory !== undefined;
    return (
      <div>
        <div className="form-group">
          <label htmlFor="codeList" className="col-sm-5 control-label">
            {locale.selectCl}
          </label>
          <div className="col-sm-7">
            {codeListSelector}
          </div>
        </div>
        <div>
          {codeListEditor}
        </div>
        <VisHintPicker visHint={visHint} locale={locale} select={visHint => updateFormat({ visHint })} />

        {notATable &&
          <div>
            <SpecialCode update={updateFormat} locale={locale} {...special} />
            <div className="form-group">
              <label className="col-sm-5 control-label">
                {locale.mandatory}
              </label>
              <div className="col-sm-4">
                <div className="checkbox">
                  <input type="checkbox" style={{ marginLeft: 0 }} checked={mandatory} onChange={toggleMandatory} />
                </div>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

SingleResponseFormatEditor.propTypes = {
  qrId: PropTypes.string.isRequired,
  format: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  mandatory: PropTypes.bool,
  toggleMandatory: PropTypes.func,
  updateFormat: PropTypes.func.isRequired,
  newCodeListFormat: PropTypes.func.isRequired,
};

SingleResponseFormatEditor.defaultProps = {
  mandatory: undefined,
  toggleMandatory: undefined,
};

export default SingleResponseFormatEditor;
