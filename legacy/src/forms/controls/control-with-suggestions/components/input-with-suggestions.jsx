import { getControlId } from '../../../../utils/widget-utils';
import ControlWithSuggestion from './control-with-suggestions';

class InputWithSuggestions extends ControlWithSuggestion {
  render() {
    const {
      input,
      label,
      required,
      disabled,
      meta: { touched, error },
    } = this.props;
    const id = getControlId('input-with-suggestions', input.name);
    return (
      <div className="ctrl-input">
        <label htmlFor={id}>
          {label}
          {required && <span className="ctrl-required">*</span>}
        </label>

        <div>
          <input
            {...input}
            type="text"
            id={id}
            autoComplete="off"
            placeholder={label}
            disabled={disabled}
            onChange={() => {
              this.handleInputChange(this.input.value);
            }}
            onKeyDown={this.handleInputKeyDown}
            onFocus={() => {
              this.handleInputFocus();
              input.onFocus();
            }}
            ref={(node) => {
              this.input = node;
            }}
          />
          {touched && error && <span className="form-error">{error}</span>}
          {super.render()}
        </div>
      </div>
    );
  }
}

export default InputWithSuggestions;
