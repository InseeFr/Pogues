import * as React from 'react';

import { LinkComponent, createLink } from '@tanstack/react-router';

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonStyle {
  Primary,
  Secondary,
}

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
  buttonStyle?: ButtonStyle;
  disabled?: boolean;
}

const AnchorButtonComponent = React.forwardRef<
  HTMLAnchorElement,
  BasicLinkProps
>(
  (
    {
      buttonStyle = ButtonStyle.Secondary,
      children,
      disabled = false,
      onClick,
      onKeyDown,
      tabIndex,
      ...props
    },
    ref,
  ) => {
    const baseClass =
      'inline-block text-center border font-semibold transition rounded px-4 py-3 min-w-40 outline-hidden focus-visible:outline focus-visible:outline-primary';

    const primaryClass =
      'bg-primary text-negative hover:bg-primary-accent active:bg-primary-active border-none disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed';

    const secondaryClass =
      'bg-white text-primary hover:bg-accent active:bg-active border-primary disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed';

    const buttonClass =
      buttonStyle === ButtonStyle.Primary ? primaryClass : secondaryClass;

    return (
      <a
        ref={ref}
        {...props}
        tabIndex={disabled ? -1 : tabIndex}
        aria-disabled={disabled}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        onKeyDown={
          disabled
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
              }
            : onKeyDown
        }
        className={`${baseClass} ${buttonClass}`}
      >
        {children}
      </a>
    );
  },
);

const CreatedLinkComponent = createLink(AnchorButtonComponent);

const ButtonLink: LinkComponent<typeof AnchorButtonComponent> = (props) => {
  return <CreatedLinkComponent {...props} />;
};

export default ButtonLink;
