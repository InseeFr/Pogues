import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Input from 'layout/forms/controls/input';
import { required } from 'layout/forms/validation-rules';
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
    if (this.props.edit) {
      this.nameInput.focus();
    } else {
      this.labelInput.focus();
    }
  }
  render() {
    const { handleSubmit, pristine, submitting, edit, onCancel } = this.props;

    return (
      <div className="component-edition">
        <form onSubmit={handleSubmit}>
          {edit
            ? <Field
                reference={input => {
                  this.nameInput = input;
                }}
                name="name"
                type="text"
                component={Input}
                label={Dictionary.name}
                validate={[required]}
                required
              />
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
            <button type="submit" disabled={!edit && (pristine || submitting)}>{Dictionary.validate}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'sequence',
})(SequenceNewEdit);
