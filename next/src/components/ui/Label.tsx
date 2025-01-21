import * as React from 'react';

import { useFormControlContext } from '@mui/base/FormControl';
import clsx from 'clsx';

const Label = React.forwardRef<
  HTMLParagraphElement,
  { className?: string; children?: React.ReactNode }
>(({ className: classNameProp, children }, ref) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p className={clsx('text-sm mb-1', classNameProp)}>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p
      ref={ref}
      className={clsx(
        'text-sm mb-1 ml-1',
        classNameProp,
        error || showRequiredError ? 'invalid text-red-500' : '',
      )}
    >
      {children}
      {required ? ' *' : ''}
    </p>
  );
});

export default Label;
