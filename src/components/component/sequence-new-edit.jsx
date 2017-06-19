import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'components/forms/controls/input';
import { required } from 'components/forms/validation-rules';
import Dictionary from 'utils/dictionary/dictionary';

class SequenceNewEdit extends Component {
  static propTypes = {
    edit: PropTypes.bool,
    handleSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  };
  static defaultProps = {
    handleSubmit: undefined,
    onCancel: undefined,
    pristine: false,
    submitting: false,
    edit: false,
  };
  componentDidMount() {
    this.labelInput.focus();
  }
  render() {
    const { handleSubmit, pristine, submitting, edit, onCancel } = this.props;

    return (
      <div id="generic-input-new">
        <form onSubmit={handleSubmit}>
          {edit
            ? <Field name="name" type="text" component={Input} label={Dictionary.name} validate={[required]} required />
            : ''}

          <Field
            reference={input => {
              this.labelInput = input;
            }}
            name="label"
            type="text"
            component={Input}
            label={Dictionary.title}
            validate={[required]}
            required
          />

          <div className="form-footer">
            {onCancel
              ? <button className="cancel" disabled={submitting} onClick={onCancel}>{Dictionary.cancel}</button>
              : ''}
            <button type="submit" disabled={!edit ? pristine || submitting : false}>{Dictionary.validate}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'sequence',
})(SequenceNewEdit);
