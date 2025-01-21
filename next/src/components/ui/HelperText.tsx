import * as React from 'react';

import { useFormControlContext } from '@mui/base/FormControl';
import clsx from 'clsx';

const HelperText = React.forwardRef<
  HTMLParagraphElement,
  { className?: string }
>((props, ref) => {
  const { className, ...other } = props;
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? (
    <p ref={ref} className={clsx('text-sm', className)} {...other}>
      This field is required.
    </p>
  ) : null;
});

export default HelperText;
