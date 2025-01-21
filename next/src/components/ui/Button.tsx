import * as React from 'react';

import { Button as BaseButton, ButtonProps } from '@mui/base/Button';
import clsx from 'clsx';

export enum ButtonType {
  Primary,
  Secondary,
}

interface ButtonWrapperProps {
  children: React.ReactNode;
  type?: ButtonType;
  onClick: () => void;
}

export default function ButtonWrapper({
  children,
  type = ButtonType.Secondary,
  onClick = () => {},
}: Readonly<ButtonWrapperProps>) {
  return (
    <CustomButton
      onClick={onClick}
      className={`${type === ButtonType.Primary ? 'bg-primary text-negative hover:bg-primary-accent active:bg-primary-active' : 'bg-white text-primary hover:bg-accent active:bg-active border-primary'}`}
    >
      {children}
    </CustomButton>
  );
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <BaseButton
        ref={ref}
        className={clsx(
          'cursor-pointer transition font-semibold leading-normal rounded px-4 py-3 border border-solid active:shadow-inner focus-visible:shadow-[0_0_0_4px_#ddd6fe] focus-visible:outline-none ui-disabled:text-disabled ui-disabled:bg-slate-200 ui-disabled:cursor-default ui-disabled:shadow-none ui-disabled:hover:bg-slate-200 ui-disabled:hover:dark:bg-slate-700 ui-disabled:border-none',
          className,
        )}
        {...other}
      />
    );
  },
);
