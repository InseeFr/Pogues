import { reduxForm } from 'redux-form';

/** redux-form injects `form` via defaultProps on a forwardRef, which React 19 ignores. */
const getFormState = (state) => state.form;

export function reduxFormNamed(config) {
  const decorate = reduxForm(config);
  return (Component) => {
    const Decorated = decorate(Component);
    function ReduxFormNamed(props) {
      return (
        <Decorated {...props} form={config.form} getFormState={getFormState} />
      );
    }
    ReduxFormNamed.displayName = `ReduxFormNamed(${config.form})`;
    return ReduxFormNamed;
  };
}
