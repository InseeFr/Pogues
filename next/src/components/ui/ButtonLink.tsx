import * as React from 'react';

import { LinkComponent, createLink } from '@tanstack/react-router';

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonStyle {
  Primary,
  Secondary,
}

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => (
    <a
      ref={ref}
      {...props}
      tabIndex={disabled ? -1 : props.tabIndex}
      aria-disabled={disabled}
      onClick={disabled ? (e) => e.preventDefault() : props.onClick}
      className={`text-center border font-semibold transition rounded px-4 py-3 min-w-40 outline-hidden focus-visible:outline focus-visible:outline-primary
      ${
        buttonStyle === ButtonStyle.Primary
          ? disabled
            ? 'bg-gray-300 text-gray-500 border-none cursor-not-allowed'
            : 'bg-primary text-negative hover:bg-primary-accent active:bg-primary-active border-none'
          : disabled
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            : 'bg-white text-primary hover:bg-accent active:bg-active border-primary'
      }
    `}
    >
      {children}
    </a>
  ),
);

const CreatedLinkComponent = createLink(AnchorButtonComponent);

const ButtonLink: LinkComponent<typeof AnchorButtonComponent> = (props) => {
  return <CreatedLinkComponent {...props} />;
};

export default ButtonLink;
